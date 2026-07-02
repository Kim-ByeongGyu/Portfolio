$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$outDir = Join-Path $root "요약본_제출용"
$previewDir = Join-Path $outDir "preview-pages"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
New-Item -ItemType Directory -Force -Path $previewDir | Out-Null

$pdfOut = Join-Path $outDir "김병규_백엔드_포트폴리오_3페이지_요약본.pdf"
$pngOutPattern = Join-Path $previewDir "page-{0:D2}.png"

$W = 1672
$H = 941
$portfolioUrl = "https://kbg-dev-portfolio.vercel.app"
$githubUrl = "github.com/Kim-ByeongGyu"
$email = "zenk5554785@gmail.com"

$qrCandidates = @(
  (Join-Path $root "_pptx_build\ppt\media\qr.png"),
  (Join-Path $root "clean-pages\page-01.png")
)

function Font($size, $style = [System.Drawing.FontStyle]::Regular) {
  return New-Object System.Drawing.Font("Malgun Gothic", $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}

function Brush($hex) {
  $hex = $hex.TrimStart("#")
  return New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(
    [Convert]::ToInt32($hex.Substring(0,2),16),
    [Convert]::ToInt32($hex.Substring(2,2),16),
    [Convert]::ToInt32($hex.Substring(4,2),16)
  ))
}

function Color($hex) {
  $hex = $hex.TrimStart("#")
  return [System.Drawing.Color]::FromArgb(
    [Convert]::ToInt32($hex.Substring(0,2),16),
    [Convert]::ToInt32($hex.Substring(2,2),16),
    [Convert]::ToInt32($hex.Substring(4,2),16)
  )
}

function RoundPath([float]$x,[float]$y,[float]$w,[float]$h,[float]$r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $p.AddArc($x,$y,$d,$d,180,90)
  $p.AddArc($x+$w-$d,$y,$d,$d,270,90)
  $p.AddArc($x+$w-$d,$y+$h-$d,$d,$d,0,90)
  $p.AddArc($x,$y+$h-$d,$d,$d,90,90)
  $p.CloseFigure()
  return $p
}

function FillRound($g,$brush,[float]$x,[float]$y,[float]$w,[float]$h,[float]$r) {
  $p = RoundPath $x $y $w $h $r
  $g.FillPath($brush,$p)
  $p.Dispose()
}

function StrokeRound($g,$pen,[float]$x,[float]$y,[float]$w,[float]$h,[float]$r) {
  $p = RoundPath $x $y $w $h $r
  $g.DrawPath($pen,$p)
  $p.Dispose()
}

function DrawText($g,[string]$text,$font,$brush,[float]$x,[float]$y,[float]$w,[float]$h,[string]$align = "Near") {
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = [System.Drawing.StringAlignment]::$align
  $fmt.LineAlignment = [System.Drawing.StringAlignment]::Near
  $fmt.Trimming = [System.Drawing.StringTrimming]::EllipsisWord
  $fmt.FormatFlags = 0
  $rect = New-Object System.Drawing.RectangleF($x,$y,$w,$h)
  $g.DrawString($text,$font,$brush,$rect,$fmt)
  $fmt.Dispose()
}

function DrawHeader($g,[string]$right,[string]$pageNo) {
  $bMuted = Brush "64748B"
  $bBlue = Brush "2563EB"
  $f = Font 18
  $g.FillRectangle($bBlue,68,38,5,28)
  DrawText $g "BACKEND ENGINEER PORTFOLIO" $f $bMuted 92 34 420 32
  DrawText $g $right $f $bMuted 1270 34 280 32 "Far"
  DrawText $g $pageNo $f $bBlue 1580 34 45 32 "Far"
  $bMuted.Dispose(); $bBlue.Dispose(); $f.Dispose()
}

function DrawTag($g,[string]$text,[float]$x,[float]$y,$fillHex="EEF6FF",$lineHex="CFE1FF",$textHex="1D4ED8") {
  $font = Font 16
  $bFill = Brush $fillHex
  $bText = Brush $textHex
  $pen = New-Object System.Drawing.Pen((Color $lineHex),1.6)
  $size = $g.MeasureString($text,$font)
  $tw = [Math]::Ceiling($size.Width) + 30
  FillRound $g $bFill $x $y $tw 38 18
  StrokeRound $g $pen $x $y $tw 38 18
  DrawText $g $text $font $bText ($x+15) ($y+8) ($tw-30) 22 "Center"
  $font.Dispose(); $bFill.Dispose(); $bText.Dispose(); $pen.Dispose()
  return $tw
}

function DrawBullet($g,[float]$x,[float]$y,[string]$text,[float]$w,$colorHex="0F766E") {
  $bDot = Brush $colorHex
  $bText = Brush "334155"
  $font = Font 18
  $g.FillEllipse($bDot,$x,$y+10,9,9)
  DrawText $g $text $font $bText ($x+24) $y ($w-24) 54
  $bDot.Dispose(); $bText.Dispose(); $font.Dispose()
}

function DrawSectionTitle($g,[float]$x,[float]$y,[string]$label,[string]$title,$accent="2563EB") {
  $bAccent = Brush $accent
  $bTitle = Brush "0F172A"
  $bLight = Brush "EFF6FF"
  $fLabel = Font 15 ([System.Drawing.FontStyle]::Bold)
  $fTitle = Font 25 ([System.Drawing.FontStyle]::Bold)
  FillRound $g $bLight $x $y 92 34 16
  DrawText $g $label $fLabel $bAccent ($x+12) ($y+8) 68 20 "Center"
  DrawText $g $title $fTitle $bTitle ($x+108) ($y+1) 520 36
  $bAccent.Dispose(); $bTitle.Dispose(); $bLight.Dispose(); $fLabel.Dispose(); $fTitle.Dispose()
}

function DrawImageCard($g,[string]$path,[float]$x,[float]$y,[float]$w,[float]$h,[string]$caption) {
  $bWhite = Brush "FFFFFF"
  $bCaption = Brush "475569"
  $pen = New-Object System.Drawing.Pen((Color "D8E3F2"),1.5)
  FillRound $g $bWhite $x $y $w $h 18
  StrokeRound $g $pen $x $y $w $h 18
  if (Test-Path $path) {
    $img = [System.Drawing.Image]::FromFile($path)
    try {
      $pad = 10
      $imgX = $x + $pad
      $imgY = $y + $pad
      $imgW = $w - ($pad * 2)
      $imgH = $h - 48
      $scale = [Math]::Max($imgW / $img.Width, $imgH / $img.Height)
      $drawW = $img.Width * $scale
      $drawH = $img.Height * $scale
      $srcW = $imgW / $scale
      $srcH = $imgH / $scale
      $srcX = [Math]::Max(0, ($img.Width - $srcW) / 2)
      $srcY = [Math]::Max(0, ($img.Height - $srcH) / 2)
      $srcRect = New-Object System.Drawing.RectangleF($srcX,$srcY,$srcW,$srcH)
      $dstRect = New-Object System.Drawing.RectangleF($imgX,$imgY,$imgW,$imgH)
      $g.SetClip((RoundPath $imgX $imgY $imgW $imgH 12))
      $g.DrawImage($img,$dstRect,$srcRect,[System.Drawing.GraphicsUnit]::Pixel)
      $g.ResetClip()
    } finally {
      $img.Dispose()
    }
  }
  $font = Font 14
  DrawText $g $caption $font $bCaption ($x+16) ($y+$h-34) ($w-32) 24
  $font.Dispose(); $bWhite.Dispose(); $bCaption.Dispose(); $pen.Dispose()
}

function GetQrPath() {
  foreach($p in $qrCandidates) {
    if (Test-Path $p) {
      if ($p.EndsWith("page-01.png")) {
        $out = Join-Path $outDir "portfolio-qr.png"
        $src = [System.Drawing.Bitmap]::FromFile($p)
        try {
          $qr = $src.Clone((New-Object System.Drawing.Rectangle(1145,260,205,205)), $src.PixelFormat)
          $qr.Save($out,[System.Drawing.Imaging.ImageFormat]::Png)
          $qr.Dispose()
          return $out
        } finally {
          $src.Dispose()
        }
      }
      return $p
    }
  }
  return $null
}

function NewCanvas() {
  $bmp = New-Object System.Drawing.Bitmap($W,$H,[System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
  $g.Clear((Color "F7FAFC"))
  return @($bmp,$g)
}

function DrawHero() {
  $tuple = NewCanvas
  $bmp = $tuple[0]; $g = $tuple[1]
  $bBg = Brush "F7FAFC"; $bNavy = Brush "0F172A"; $bMuted = Brush "475569"; $bBlue = Brush "2563EB"; $bGreen = Brush "0F766E"; $bWhite = Brush "FFFFFF"
  $pen = New-Object System.Drawing.Pen((Color "D8E3F2"),1.5)
  DrawHeader $g "Portfolio Summary" "01"

  $fEyebrow = Font 19 ([System.Drawing.FontStyle]::Bold)
  $fName = Font 76 ([System.Drawing.FontStyle]::Bold)
  $fTitle = Font 36 ([System.Drawing.FontStyle]::Bold)
  $fBody = Font 22
  DrawText $g "BACKEND DEVELOPER" $fEyebrow $bBlue 92 110 360 32
  DrawText $g "김병규" $fName $bNavy 90 152 420 90
  DrawText $g "인증·결제·운영 흐름을 검증하는 백엔드 개발자" $fTitle $bNavy 90 255 920 52
  DrawText $g "기능 구현에서 멈추지 않고, 운영 중 깨지기 쉬운 인증·결제·세션 흐름을 검증합니다." $fBody $bMuted 92 325 890 72

  $x = 92
  foreach($tag in @("Java","Spring Boot","Spring Security","Redis","PortOne","WebSocket","AWS","Docker")) {
    $w = DrawTag $g $tag $x 420
    $x += $w + 12
  }

  $cards = @(
    @("2","대표 프로젝트","Univ-US · GRIP","2563EB"),
    @("4","운영 흐름 개선","인증 · 결제 · 웹훅 · 세션","0F766E"),
    @("26","결제 QA 검증","시나리오 기반 확인","7C3AED")
  )
  $x = 92
  foreach($c in $cards) {
    FillRound $g $bWhite $x 525 300 150 18
    StrokeRound $g $pen $x 525 300 150 18
    $bAccent = Brush $c[3]
    $fNum = Font 48 ([System.Drawing.FontStyle]::Bold)
    $fCardTitle = Font 21 ([System.Drawing.FontStyle]::Bold)
    $fCardText = Font 17
    DrawText $g $c[0] $fNum $bAccent ($x+28) 552 82 62
    DrawText $g $c[1] $fCardTitle $bNavy ($x+105) 560 170 32
    DrawText $g $c[2] $fCardText $bMuted ($x+105) 603 170 46
    $bAccent.Dispose(); $fNum.Dispose(); $fCardTitle.Dispose(); $fCardText.Dispose()
    $x += 330
  }

  FillRound $g $bWhite 92 715 900 128 20
  StrokeRound $g $pen 92 715 900 128 20
  DrawSectionTitle $g 124 745 "POINT" "제가 보여주려는 기준"
  $fSmall = Font 18
  DrawText $g "API를 구현하는 데서 끝내지 않고, 데이터가 언제 바뀌고 어떤 상태가 보존되어야 하는지까지 검증합니다." $fSmall $bMuted 235 790 700 38

  FillRound $g (Brush "0F1D37") 1110 130 405 650 30
  $cardPen = New-Object System.Drawing.Pen((Color "6BA4FF"),2)
  StrokeRound $g $cardPen 1110 130 405 650 30
  $fQrTitle = Font 30 ([System.Drawing.FontStyle]::Bold)
  DrawText $g "Portfolio QR" $fQrTitle $bWhite 1160 180 250 42
  $qr = GetQrPath
  if ($qr) {
    $img = [System.Drawing.Image]::FromFile($qr)
    try { $g.DrawImage($img,1160,232,210,210) } finally { $img.Dispose() }
  }
  DrawText $g "kbg-dev-portfolio.vercel.app" (Font 17) (Brush "60A5FA") 1160 482 300 28
  $g.DrawLine((New-Object System.Drawing.Pen((Color "5B7DB5"),2)),1155,530,1465,530)
  DrawText $g "GitHub" (Font 17 ([System.Drawing.FontStyle]::Bold)) $bWhite 1160 575 90 28
  DrawText $g $githubUrl (Font 16) (Brush "DDE8F8") 1255 575 245 28
  DrawText $g "Email" (Font 17 ([System.Drawing.FontStyle]::Bold)) $bWhite 1160 630 90 28
  DrawText $g $email (Font 16) (Brush "DDE8F8") 1255 630 245 28
  DrawText $g "상세 화면 · 다이어그램 · 검증 이미지는 온라인에서 확인" (Font 15) (Brush "BFD3F7") 1160 700 285 48

  $out = $pngOutPattern -f 1
  $bmp.Save($out,[System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
  foreach($o in @($bBg,$bNavy,$bMuted,$bBlue,$bGreen,$bWhite,$pen,$cardPen,$fEyebrow,$fName,$fTitle,$fBody,$fQrTitle,$fSmall)){ if($o){$o.Dispose()} }
  return $out
}

function DrawProjectPage($pageNo,$project) {
  $tuple = NewCanvas
  $bmp = $tuple[0]; $g = $tuple[1]
  $bNavy = Brush "0F172A"; $bMuted = Brush "475569"; $bBlue = Brush "2563EB"; $bGreen = Brush "0F766E"; $bWhite = Brush "FFFFFF"; $bSoft = Brush "EFF6FF"
  $pen = New-Object System.Drawing.Pen((Color "D8E3F2"),1.5)
  DrawHeader $g $project.Header $("{0:D2}" -f $pageNo)

  DrawText $g $project.Title (Font 52 ([System.Drawing.FontStyle]::Bold)) $bNavy 92 92 760 70
  DrawText $g $project.Subtitle (Font 24) $bMuted 94 158 900 34
  $periodText = "$($project.Period) · $($project.Team) · $($project.Role)"
  DrawText $g $periodText (Font 18) $bBlue 96 202 720 28

  FillRound $g $bWhite 92 250 930 138 22
  StrokeRound $g $pen 92 250 930 138 22
  $bLabel = Brush "EFF6FF"
  FillRound $g $bLabel 124 280 92 34 16
  DrawText $g "개요" (Font 15 ([System.Drawing.FontStyle]::Bold)) $bBlue 124 288 92 20 "Center"
  DrawText $g "프로젝트 개요" (Font 25 ([System.Drawing.FontStyle]::Bold)) $bNavy 238 276 260 36
  DrawText $g $project.Overview (Font 17) $bMuted 238 318 720 58
  $bLabel.Dispose()

  FillRound $g $bWhite 1055 92 480 296 24
  StrokeRound $g $pen 1055 92 480 296 24
  DrawText $g "핵심 요약" (Font 26 ([System.Drawing.FontStyle]::Bold)) $bNavy 1092 125 160 36
  $y=178
  foreach($m in $project.Metrics) {
    $bM = Brush $m[2]
    DrawText $g $m[0] (Font 37 ([System.Drawing.FontStyle]::Bold)) $bM 1092 $y 130 54
    DrawText $g $m[1] (Font 18) $bMuted 1240 ($y+10) 235 44
    $bM.Dispose()
    $y += 70
  }

  FillRound $g $bWhite 92 420 455 250 22
  StrokeRound $g $pen 92 420 455 250 22
  DrawSectionTitle $g 124 448 "01" "담당 역할" $project.Accent
  $y=500
  foreach($t in $project.Roles) { DrawBullet $g 124 $y $t 370 $project.Accent; $y += 46 }

  FillRound $g $bWhite 575 420 455 250 22
  StrokeRound $g $pen 575 420 455 250 22
  DrawSectionTitle $g 607 448 "02" "핵심 구현" $project.Accent
  $y=500
  foreach($t in $project.Implementations) { DrawBullet $g 607 $y $t 370 $project.Accent; $y += 46 }

  FillRound $g $bWhite 1058 420 478 250 22
  StrokeRound $g $pen 1058 420 478 250 22
  DrawSectionTitle $g 1090 448 "03" "문제 해결 / 검증" $project.Accent
  $y=500
  foreach($t in $project.Verifications) { DrawBullet $g 1090 $y $t 395 $project.Accent; $y += 46 }

  $imgY = 704
  $x = 92
  foreach($img in $project.Images) {
    DrawImageCard $g $img[0] $x $imgY 300 135 $img[1]
    $x += 324
  }

  FillRound $g $bWhite 1090 704 445 135 20
  StrokeRound $g $pen 1090 704 445 135 20
  DrawText $g "기술 스택" (Font 21 ([System.Drawing.FontStyle]::Bold)) $bNavy 1120 724 150 28
  $tx=1120; $ty=765
  foreach($tag in $project.Tags) {
    $tw = DrawTag $g $tag $tx $ty "F8FAFC" "D8E3F2" "334155"
    $tx += $tw + 8
    if($tx -gt 1450) { $tx = 1120; $ty += 46 }
  }

  DrawText $g "온라인 포트폴리오에서 상세 화면·다이어그램·GitHub 링크 확인 가능" (Font 15) $bMuted 92 875 820 28
  DrawText $g $portfolioUrl (Font 15 ([System.Drawing.FontStyle]::Bold)) $bBlue 1070 875 450 28 "Far"

  $out = $pngOutPattern -f $pageNo
  $bmp.Save($out,[System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
  foreach($o in @($bNavy,$bMuted,$bBlue,$bGreen,$bWhite,$bSoft,$pen)){ if($o){$o.Dispose()} }
  return $out
}

function BuildPdf($pages,$outPdf) {
  $ms = New-Object System.IO.MemoryStream
  $writer = New-Object System.IO.BinaryWriter($ms)
  $enc = [System.Text.Encoding]::ASCII
  function Wrt([string]$s) {
    $bytes = $enc.GetBytes($s)
    $writer.Write($bytes,0,$bytes.Length)
  }
  $offsets = New-Object System.Collections.Generic.List[long]
  function ObjStart([int]$n) { $offsets.Add($ms.Position); Wrt "$n 0 obj`n" }
  function ObjEnd() { Wrt "endobj`n" }
  function JpegBytes([string]$path) {
    $img = [System.Drawing.Image]::FromFile($path)
    try {
      $stream = New-Object System.IO.MemoryStream
      $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" } | Select-Object -First 1
      $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
      $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[int64]96)
      $img.Save($stream,$codec,$params)
      [byte[]]$arr = $stream.ToArray()
      $stream.Dispose()
      return ,$arr
    } finally { $img.Dispose() }
  }
  Wrt "%PDF-1.4`n%SUMMARY`n"
  ObjStart 1; Wrt "<< /Type /Catalog /Pages 2 0 R >>`n"; ObjEnd
  $kids=@(); for($i=0;$i -lt $pages.Count;$i++){ $kids += (3+$i*3) }
  ObjStart 2; Wrt "<< /Type /Pages /Count $($pages.Count) /Kids ["; foreach($k in $kids){ Wrt "$k 0 R " }; Wrt "] >>`n"; ObjEnd
  for($i=0;$i -lt $pages.Count;$i++){
    $pageObj=3+$i*3; $contentObj=$pageObj+1; $imageObj=$pageObj+2; $im="Im$($i+1)"
    ObjStart $pageObj; Wrt "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 960 540] /Resources << /XObject << /$im $imageObj 0 R >> >> /Contents $contentObj 0 R >>`n"; ObjEnd
    $content="q`n960 0 0 540 0 0 cm`n/$im Do`nQ`n"
    ObjStart $contentObj; Wrt "<< /Length $($content.Length) >>`nstream`n$content`nendstream`n"; ObjEnd
    [byte[]]$jpg=JpegBytes $pages[$i]
    ObjStart $imageObj; Wrt "<< /Type /XObject /Subtype /Image /Width $W /Height $H /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length $($jpg.Length) >>`nstream`n"; $writer.Write($jpg,0,$jpg.Length); Wrt "`nendstream`n"; ObjEnd
  }
  $xref=$ms.Position
  Wrt "xref`n0 $($offsets.Count+1)`n0000000000 65535 f `n"
  foreach($o in $offsets){ Wrt (($o.ToString("0000000000"))+" 00000 n `n") }
  Wrt "trailer`n<< /Size $($offsets.Count+1) /Root 1 0 R >>`nstartxref`n$xref`n%%EOF`n"
  $writer.Flush()
  [System.IO.File]::WriteAllBytes($outPdf,$ms.ToArray())
  $writer.Dispose(); $ms.Dispose()
}

$projectRoot = Join-Path (Split-Path -Parent $root) "public\projects"
$univ = [pscustomobject]@{
  Header = "Project 1 · Univ-US"
  Accent = "2563EB"
  Title = "Univ-US"
  Subtitle = "대학 생활 통합 플랫폼 · 인증/결제/관리자 운영 API"
  Period = "2026.05 - 2026.06"
  Team = "팀 프로젝트"
  Role = "Backend"
  Overview = "학사·커뮤니티·예약·구독 결제·AI 챗봇을 포함한 대학 통합 서비스입니다. 인증/보안, 결제/웹훅, 관리자 대시보드, 실시간 문의 API를 담당했습니다."
  Metrics = @(@("4","운영 흐름 개선","2563EB"),@("26","구독·결제 QA","0F766E"),@("3","핵심 문제 해결","7C3AED"))
  Roles = @("회원 인증/보안 및 역할 기반 인가","구독 결제·웹훅 처리","관리자 대시보드 운영 API","관리자 실시간 문의 채팅 API")
  Implementations = @("PortOne 결제 상태 전이·이력 스냅샷","웹훅 반복 호출 중복 처리 방어","Redis 기반 관리자 단일 세션 정책","HttpOnly Cookie + Redis 세션 구조")
  Verifications = @("과거 결제 금액 SQL 재조회","반복 웹훅 중복 처리 없음 확인","409 충돌 응답·세션 교체 확인","Swagger/DB 기반 QA 케이스 정리")
  Images = @(
    @((Join-Path $projectRoot "univus\04-payment.png"),"구독 결제 화면"),
    @((Join-Path $projectRoot "univus\17-admin-session-conflict.png"),"관리자 세션 충돌"),
    @((Join-Path $projectRoot "univus\18-payment-snapshot-query.png"),"결제 이력 검증")
  )
  Tags = @("Java 21","Spring Boot","Security","Redis","Oracle","PortOne","WebSocket","Next.js")
}

$grip = [pscustomobject]@{
  Header = "Project 2 · GRIP"
  Accent = "0F766E"
  Title = "GRIP"
  Subtitle = "클라이밍장 지도 기반 정보·커뮤니티 서비스"
  Period = "2024.07 - 2024.09"
  Team = "4인 팀"
  Role = "Backend"
  Overview = "클라이밍장 정보를 지도 기반으로 제공하는 커뮤니티 서비스입니다. 목록/검색, 지도 연동, 혼잡도 조회, 좋아요 토글 API를 담당했습니다."
  Metrics = @(@("100+","클라이밍장 데이터","0F766E"),@("40+","AWS 배포 환경 접속","2563EB"),@("4","팀 프로젝트 인원","7C3AED"))
  Roles = @("클라이밍장 목록/검색 API","Naver Maps 지도 화면 연동","혼잡도 조회 API 연결","게시글 좋아요 토글 API")
  Implementations = @("지도 마커·정보창·상세 이동 흐름","시간대별 혼잡도 조회·표시","userId + postId 좋아요 중복 방지","게시글 페이징·정렬 개선")
  Verifications = @("마커 노출·상세 이동 흐름 확인","혼잡도 그래프 표시 확인","좋아요 반복 클릭 상태 확인","AWS 배포 환경 접속 확인")
  Images = @(
    @((Join-Path $projectRoot "grip\07-main-map.png"),"지도 기반 메인 화면"),
    @((Join-Path $projectRoot "grip\08-gym-detail.png"),"클라이밍장 상세"),
    @((Join-Path $projectRoot "grip\10-post-detail.png"),"게시글 상세")
  )
  Tags = @("Java","Spring Boot","JPA","MySQL","Redis","AWS","JWT","Naver Maps")
}

$pages = @()
$pages += DrawHero
$pages += DrawProjectPage 2 $univ
$pages += DrawProjectPage 3 $grip
BuildPdf $pages $pdfOut

Write-Output "PDF=$pdfOut"
Write-Output "PREVIEW=$previewDir"
