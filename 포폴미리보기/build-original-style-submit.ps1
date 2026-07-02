Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$sourceDir = Join-Path $root "clean-pages"
$outDir = Join-Path $root "원본디자인_제출용"
$pageDir = Join-Path $outDir "pages"
$pdfOut = Join-Path $outDir "김병규_백엔드_포트폴리오_원본디자인_제출용.pdf"

New-Item -ItemType Directory -Force -Path $outDir | Out-Null
New-Item -ItemType Directory -Force -Path $pageDir | Out-Null

function ColorFromHex([string]$hex) {
  $hex = $hex.TrimStart("#")
  return [System.Drawing.Color]::FromArgb(
    [Convert]::ToInt32($hex.Substring(0,2),16),
    [Convert]::ToInt32($hex.Substring(2,2),16),
    [Convert]::ToInt32($hex.Substring(4,2),16)
  )
}

function Brush([string]$hex) {
  New-Object System.Drawing.SolidBrush((ColorFromHex $hex))
}

function FontObj([float]$size, [System.Drawing.FontStyle]$style = [System.Drawing.FontStyle]::Regular) {
  New-Object System.Drawing.Font("Malgun Gothic", $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}

function DrawText($g, [string]$text, $font, $brush, [float]$x, [float]$y, [float]$w, [float]$h, [string]$align = "Near") {
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = [System.Drawing.StringAlignment]::$align
  $fmt.LineAlignment = [System.Drawing.StringAlignment]::Near
  $fmt.Trimming = [System.Drawing.StringTrimming]::EllipsisCharacter
  $rect = New-Object System.Drawing.RectangleF($x, $y, $w, $h)
  $g.DrawString($text, $font, $brush, $rect, $fmt)
  $fmt.Dispose()
}

function SaveJpeg($bitmap, [string]$path, [int]$quality = 96) {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]$quality)
  $bitmap.Save($path, $codec, $params)
  $params.Dispose()
}

function JpegBytes([string]$path) {
  $bmp = [System.Drawing.Bitmap]::FromFile($path)
  $ms = New-Object System.IO.MemoryStream
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]92)
  $bmp.Save($ms, $codec, $params)
  $bytes = $ms.ToArray()
  $params.Dispose()
  $ms.Dispose()
  $bmp.Dispose()
  return $bytes
}

function BuildPdf($pagePaths, [string]$outPdf) {
  $ms = New-Object System.IO.MemoryStream
  $writer = New-Object System.IO.BinaryWriter($ms)
  $offsets = New-Object System.Collections.Generic.List[long]

  function W([string]$s) {
    $bytes = [System.Text.Encoding]::ASCII.GetBytes($s)
    $writer.Write($bytes)
  }

  function ObjStart([int]$num) {
    $offsets.Add($ms.Position)
    W "$num 0 obj`n"
  }

  function ObjEnd() { W "endobj`n" }

  W "%PDF-1.4`n%PORTFOLIO`n"
  ObjStart 1; W "<< /Type /Catalog /Pages 2 0 R >>`n"; ObjEnd
  $pageObjNums = @()
  for ($j = 0; $j -lt $pagePaths.Count; $j++) { $pageObjNums += (3 + $j * 3) }
  ObjStart 2; W "<< /Type /Pages /Count $($pagePaths.Count) /Kids ["; foreach ($n in $pageObjNums) { W "$n 0 R " }; W "] >>`n"; ObjEnd

  for ($j = 0; $j -lt $pagePaths.Count; $j++) {
    $pageObj = 3 + $j * 3
    $contentObj = $pageObj + 1
    $imageObj = $pageObj + 2
    $imName = "Im$($j + 1)"

    ObjStart $pageObj
    W "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 960 540] /Resources << /XObject << /$imName $imageObj 0 R >> >> /Contents $contentObj 0 R >>`n"
    ObjEnd

    $content = "q`n960 0 0 540 0 0 cm`n/$imName Do`nQ`n"
    $contentBytes = [System.Text.Encoding]::ASCII.GetBytes($content)
    ObjStart $contentObj
    W "<< /Length $($contentBytes.Length) >>`nstream`n"
    $writer.Write($contentBytes)
    W "endstream`n"
    ObjEnd

    [byte[]]$jpg = JpegBytes $pagePaths[$j]
    ObjStart $imageObj
    W "<< /Type /XObject /Subtype /Image /Width 1672 /Height 941 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length $($jpg.Length) >>`nstream`n"
    $writer.Write($jpg)
    W "`nendstream`n"
    ObjEnd
  }

  $xref = $ms.Position
  W "xref`n0 $($offsets.Count + 1)`n0000000000 65535 f `n"
  foreach ($off in $offsets) { W ("{0:D10} 00000 n `n" -f $off) }
  W "trailer`n<< /Size $($offsets.Count + 1) /Root 1 0 R >>`nstartxref`n$xref`n%%EOF"

  $writer.Flush()
  [System.IO.File]::WriteAllBytes($outPdf, $ms.ToArray())
  $writer.Dispose()
  $ms.Dispose()
}

$rightLabels = @{
  2 = "Summary · Core Competency"
  3 = "Project 1 · Univ-US"
  4 = "Univ-US · Payment Flow"
  5 = "Univ-US · Troubleshooting"
  6 = "Univ-US · QA Evidence"
  7 = "Project 2 · GRIP"
  8 = "Portfolio Link"
}

$pagePaths = New-Object System.Collections.Generic.List[string]
for ($i = 1; $i -le 8; $i++) {
  $src = Join-Path $sourceDir ("page-{0:D2}.png" -f $i)
  $dst = Join-Path $pageDir ("page-{0:D2}.jpg" -f $i)

  $bmp = [System.Drawing.Bitmap]::FromFile($src)
  $canvas = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $g = [System.Drawing.Graphics]::FromImage($canvas)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
  $g.DrawImage($bmp, 0, 0, $bmp.Width, $bmp.Height)

  if ($i -ge 2) {
    $bg = Brush "F8FBFF"
    $blue = Brush "2563EB"
    $muted = Brush "64748B"
    $linePen = New-Object System.Drawing.Pen((ColorFromHex "D8E3F2"), 1.4)
    $font = FontObj 17
    $fontNum = FontObj 17 ([System.Drawing.FontStyle]::Bold)

    $g.FillRectangle($bg, 0, 0, 1672, 72)
    $g.FillRectangle($blue, 68, 38, 5, 28)
    DrawText $g "BACKEND ENGINEER PORTFOLIO" $font $muted 96 34 420 30
    DrawText $g $rightLabels[$i] $font $muted 1180 34 320 30 "Far"
    DrawText $g ("{0:D2}" -f $i) $fontNum $blue 1540 34 60 30 "Far"
    $g.DrawLine($linePen, 68, 72, 1608, 72)

    $linePen.Dispose()
    $bg.Dispose()
    $blue.Dispose()
    $muted.Dispose()
    $font.Dispose()
    $fontNum.Dispose()
  }

  SaveJpeg $canvas $dst 96
  $pagePaths.Add($dst)

  $g.Dispose()
  $canvas.Dispose()
  $bmp.Dispose()
}

BuildPdf $pagePaths $pdfOut

Write-Output "PDF=$pdfOut"
Write-Output "PAGES=$pageDir"
