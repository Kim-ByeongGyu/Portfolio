$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.IO.Compression.FileSystem

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$cleanDir = Join-Path $root "clean-pages"
$pdfOut = Join-Path $root "김병규_백엔드_포트폴리오_최종제출본.pdf"
$pptxOut = Join-Path $root "김병규_백엔드_포트폴리오_Canva수정용.pptx"
$work = Join-Path $root "_pptx_build"

if (Test-Path $work) { Remove-Item -LiteralPath $work -Recurse -Force }
New-Item -ItemType Directory -Force -Path $work | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $work "_rels") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $work "docProps") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $work "ppt\_rels") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $work "ppt\slides\_rels") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $work "ppt\slideMasters\_rels") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $work "ppt\slideLayouts\_rels") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $work "ppt\theme") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $work "ppt\media") | Out-Null

function E([string]$s) {
  return [System.Security.SecurityElement]::Escape($s)
}

function EmuX([double]$px) { return [int64][Math]::Round($px / 1672.0 * 12192000) }
function EmuY([double]$px) { return [int64][Math]::Round($px / 941.0 * 6858000) }

function Save-Text($path, $text) {
  [System.IO.File]::WriteAllText($path, $text, [System.Text.UTF8Encoding]::new($false))
}

function New-Font($size, $style = [System.Drawing.FontStyle]::Regular) {
  return New-Object System.Drawing.Font("Malgun Gothic", $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}

function JpegBytes([string]$pngPath) {
  $img = [System.Drawing.Image]::FromFile($pngPath)
  try {
    $stream = New-Object System.IO.MemoryStream
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" } | Select-Object -First 1
    $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]95)
    $img.Save($stream, $codec, $params)
    [byte[]]$arr = $stream.ToArray()
    $stream.Dispose()
    return ,$arr
  } finally {
    $img.Dispose()
  }
}

function Build-Pdf($pagePaths, $outPdf) {
  $ms = New-Object System.IO.MemoryStream
  $writer = New-Object System.IO.BinaryWriter($ms)
  $enc = [System.Text.Encoding]::ASCII
  function W([string]$s) {
    $bytes = $enc.GetBytes($s)
    $writer.Write($bytes, 0, $bytes.Length)
  }
  $offsets = New-Object System.Collections.Generic.List[long]
  function ObjStart([int]$n) { $offsets.Add($ms.Position); W "$n 0 obj`n" }
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
    ObjStart $contentObj
    W "<< /Length $($content.Length) >>`nstream`n$content`nendstream`n"
    ObjEnd
    [byte[]]$jpg = JpegBytes $pagePaths[$j]
    ObjStart $imageObj
    W "<< /Type /XObject /Subtype /Image /Width 1672 /Height 941 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length $($jpg.Length) >>`nstream`n"
    $writer.Write($jpg, 0, $jpg.Length)
    W "`nendstream`n"
    ObjEnd
  }
  $xref = $ms.Position
  W "xref`n0 $($offsets.Count + 1)`n"
  W "0000000000 65535 f `n"
  foreach ($o in $offsets) { W (($o.ToString("0000000000")) + " 00000 n `n") }
  W "trailer`n<< /Size $($offsets.Count + 1) /Root 1 0 R >>`nstartxref`n$xref`n%%EOF`n"
  $writer.Flush()
  [System.IO.File]::WriteAllBytes($outPdf, $ms.ToArray())
  $writer.Dispose()
  $ms.Dispose()
}

$pagePaths = 1..8 | ForEach-Object { Join-Path $cleanDir ("page-{0:D2}.png" -f $_) }
Build-Pdf $pagePaths $pdfOut

$qrSource = Join-Path $cleanDir "page-01.png"
$qrPath = Join-Path $work "ppt\media\qr.png"
$src = [System.Drawing.Bitmap]::FromFile($qrSource)
try {
  $qr = $src.Clone((New-Object System.Drawing.Rectangle(1145,260,205,205)), $src.PixelFormat)
  $qr.Save($qrPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $qr.Dispose()
} finally {
  $src.Dispose()
}

$script:shapeId = 1
function NextId() { $script:shapeId += 1; return $script:shapeId }

function TextBox($x,$y,$w,$h,$text,$pt,$color="0F1D37",$bold=$false,$align="l") {
  $id = NextId
  $b = if ($bold) { ' b="1"' } else { "" }
  $sz = [int]($pt * 100)
  $text = E $text
  return @"
<p:sp><p:nvSpPr><p:cNvPr id="$id" name="Text $id"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="$(EmuX $x)" y="$(EmuY $y)"/><a:ext cx="$(EmuX $w)" cy="$(EmuY $h)"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr wrap="square"/><a:lstStyle/><a:p><a:pPr algn="$align"/><a:r><a:rPr lang="ko-KR" sz="$sz"$b><a:solidFill><a:srgbClr val="$color"/></a:solidFill><a:latin typeface="Malgun Gothic"/><a:ea typeface="Malgun Gothic"/></a:rPr><a:t>$text</a:t></a:r></a:p></p:txBody></p:sp>
"@
}

function RectShape($x,$y,$w,$h,$fill,$line="",$radius=$false) {
  $id = NextId
  $geom = if ($radius) { "roundRect" } else { "rect" }
  $ln = if ($line -eq "") { '<a:ln><a:noFill/></a:ln>' } else { "<a:ln w=`"12700`"><a:solidFill><a:srgbClr val=`"$line`"/></a:solidFill></a:ln>" }
  return @"
<p:sp><p:nvSpPr><p:cNvPr id="$id" name="Shape $id"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="$(EmuX $x)" y="$(EmuY $y)"/><a:ext cx="$(EmuX $w)" cy="$(EmuY $h)"/></a:xfrm><a:prstGeom prst="$geom"><a:avLst/></a:prstGeom><a:solidFill><a:srgbClr val="$fill"/></a:solidFill>$ln</p:spPr></p:sp>
"@
}

function LineShape($x1,$y1,$x2,$y2,$color="D5E0EF") {
  $id = NextId
  return @"
<p:cxnSp><p:nvCxnSpPr><p:cNvPr id="$id" name="Line $id"/><p:cNvCxnSpPr/><p:nvPr/></p:nvCxnSpPr><p:spPr><a:xfrm><a:off x="$(EmuX $x1)" y="$(EmuY $y1)"/><a:ext cx="$(EmuX ($x2-$x1))" cy="$(EmuY ($y2-$y1))"/></a:xfrm><a:prstGeom prst="line"><a:avLst/></a:prstGeom><a:ln w="19050"><a:solidFill><a:srgbClr val="$color"/></a:solidFill></a:ln></p:spPr></p:cxnSp>
"@
}

function Bullet($x,$y,$text,$color="008868") {
  return (RectShape $x ($y+8) 8 8 $color "" $true) + (TextBox ($x+28) $y 520 34 $text 15 "4F5E79")
}

function SlideXml($body) {
  return @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>$body</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>
"@
}

function Pic($x,$y,$w,$h,$rid="rId1") {
  $id = NextId
  return @"
<p:pic><p:nvPicPr><p:cNvPr id="$id" name="QR"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr><p:blipFill><a:blip r:embed="$rid"/><a:stretch><a:fillRect/></a:stretch></p:blipFill><p:spPr><a:xfrm><a:off x="$(EmuX $x)" y="$(EmuY $y)"/><a:ext cx="$(EmuX $w)" cy="$(EmuY $h)"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>
"@
}

$slides = @()

$s = ""
$s += RectShape 0 0 1672 941 "061833"
$s += TextBox 90 90 520 36 "BACKEND ENGINEER PORTFOLIO" 15 "DDE8F8"
$s += TextBox 90 170 470 110 "김병규" 54 "FFFFFF" $true
$s += TextBox 90 315 930 56 "인증 · 결제 · 운영 흐름을 검증하는 백엔드 개발자" 28 "DDE8F8" $true
$s += TextBox 90 405 870 70 "기능 구현에서 멈추지 않고, 결제 이력 정합성·웹훅 멱등성·관리자 세션 등 운영상 깨질 수 있는 흐름을 설계하고 검증합니다." 16 "DDE8F8"
$x=90; foreach($t in @("Java","Spring Boot","Spring Security","JWT","Redis","PortOne","WebSocket","AWS","Docker")){ $s += RectShape $x 495 100 40 "1C3664" "588BD9" $true; $s += TextBox ($x+12) 505 90 24 $t 10 "FFFFFF"; $x += 112 }
$cards=@(@(90,"2","대표 프로젝트","Univ-US · GRIP"),@(410,"4","운영 흐름 개선","인증 · 결제 · 웹훅 · 세션"),@(730,"26","구독 QA 케이스","시나리오 기반 검증 완료"))
foreach($c in $cards){ $s += RectShape $c[0] 590 300 190 "203C70" "588BD9" $true; $s += TextBox ($c[0]+35) 625 90 70 $c[1] 36 "4EA0FF" $true; $s += TextBox ($c[0]+35) 705 220 30 $c[2] 16 "FFFFFF" $true; $s += TextBox ($c[0]+35) 745 240 28 $c[3] 13 "DDE8F8" }
$s += RectShape 1105 178 395 565 "11203D" "588BD9" $true
$s += TextBox 1150 225 260 35 "Portfolio QR" 18 "FFFFFF" $true
$s += Pic 1145 260 205 205
$s += TextBox 1185 505 270 30 "kbg-dev-portfolio.vercel.app" 13 "5BA0FF"
$s += LineShape 1140 548 1460 548 "588BD9"
$s += TextBox 1148 595 85 25 "GitHub" 12 "FFFFFF"; $s += TextBox 1235 595 240 25 "github.com/Kim-ByeongGyu" 12 "DDE8F8"
$s += TextBox 1148 650 85 25 "Email" 12 "FFFFFF"; $s += TextBox 1235 650 240 25 "zenk5554785@gmail.com" 12 "DDE8F8"
$slides += $s

$s = ""
$s += RectShape 0 0 1672 941 "F8FBFF"
$s += TextBox 70 35 420 26 "김병규 Backend Engineer Portfolio" 10 "71829A"
$s += TextBox 1600 35 40 26 "02" 10 "2464EB" $true
$s += TextBox 100 95 600 55 "요약 및 핵심 역량" 31 "0F1D37" $true
$s += TextBox 100 155 620 28 "프로젝트 경험과 운영 관점에서 정리한 백엔드 핵심 역량" 14 "566680"
$xs=@(65,585,1115); $titles=@("소개","작업 관점","제출 문서 구성"); $texts=@("의료공학 전공에서 개발로 전환하여 기능 구현을 넘어 운영 중 깨질 수 있는 흐름까지 고려합니다.","인증, 결제, 세션, 웹훅, 관리자 운영 등 실제 서비스에서 문제가 되기 쉬운 흐름을 검증합니다.","대표 프로젝트, 설계 흐름, 트러블슈팅, 검증 포인트를 중심으로 경험과 역량을 정리했습니다.")
for($i=0;$i -lt 3;$i++){ $s += RectShape $xs[$i] 215 450 150 "FFFFFF" "D5E0EF" $true; $s += TextBox ($xs[$i]+140) 245 260 28 $titles[$i] 16 "0F1D37" $true; $s += TextBox ($xs[$i]+140) 285 280 70 $texts[$i] 11 "566680" }
$s += RectShape 65 385 1540 315 "FFFFFF" "D5E0EF" $true
$s += RectShape 65 385 1540 47 "061833" "" $true
$s += TextBox 105 400 200 28 "영역" 13 "FFFFFF" $true; $s += TextBox 510 400 700 28 "적용 사례 / 검증 방식" 13 "FFFFFF" $true
$rows=@(
@("인증 / 인가","Spring Security / JWT 기반 인증과 역할 기반 인가 설계, 운영 시나리오를 고려한 접근 제어"),
@("결제 / 구독","PortOne 연동, 웹훅 멱등 처리, 결제 이력 스냅샷 저장, QA 시나리오 기반 검증"),
@("세션 관리","HttpOnly 쿠키, Redis 기반 refresh/session/admin-session 저장 및 중복 로그인 제어"),
@("외부 API 연동","Naver Maps, SMS, Kakao OAuth2, PortOne 결제 API 안정 연동 및 예외 처리"),
@("실시간 기능","STOMP 기반 WebSocket으로 관리자 실시간 문의 채팅 구현 및 연결/전송/수신 흐름 검증")
)
$y=450; foreach($r in $rows){ $s += TextBox 110 $y 260 30 $r[0] 12 "0F1D37" $true; $s += TextBox 510 $y 1000 30 $r[1] 11 "566680"; $y += 52 }
$slides += $s

$s = ""
$s += RectShape 0 0 1672 941 "F8FBFF"; $s += TextBox 70 35 420 26 "BACKEND ENGINEER PORTFOLIO" 10 "71829A"; $s += TextBox 1468 35 160 26 "Project 1 · Univ-US 03" 10 "566680"
$s += TextBox 90 95 650 60 "Project 1. Univ-US" 36 "0F1D37" $true; $s += TextBox 90 160 660 30 "대학 생활 통합 플랫폼 · 인증/결제/관리자 운영 API 담당" 15 "566680"
$s += RectShape 90 220 1490 150 "061833" "" $true; $s += TextBox 135 260 260 45 "Univ-US" 24 "FFFFFF" $true; $s += TextBox 135 315 360 28 "2026.05 - 2026.06 · 팀 프로젝트 · Backend" 12 "DDE8F8"; $s += TextBox 580 275 850 70 "대학 생활 통합 플랫폼으로, 학사·커뮤니티·예약·구독 결제·AI 챗봇 등 여러 도메인을 포함한 서비스입니다. 회원 인증/보안, 구독 결제·웹훅, 관리자 운영 API, 관리자 실시간 문의 채팅 API를 담당했습니다." 13 "DDE8F8"
$s += RectShape 90 398 680 300 "FFFFFF" "D5E0EF" $true; $s += TextBox 120 420 240 28 "담당 범위" 17 "0F1D37" $true
$tasks=@("회원 인증/보안","구독 결제·웹훅","관리자 운영 API","관리자 채팅 API"); $desc=@("JWT 발급·검증, 역할 기반 인가, 세션 관리, 보안 적용","PortOne 연동 구독 결제, 결제 검증, 웹훅 처리","회원/구독/문의 관리, 통계/리포트, 권한 및 공지 관리","실시간 문의 채팅, 메시지 저장 및 알림, 연결 관리")
$y=470; for($i=0;$i -lt 4;$i++){ $s += RectShape 120 $y 180 34 "EDF4FF" "" $true; $s += TextBox 145 ($y+7) 160 22 $tasks[$i] 11 "2464EB" $true; $s += TextBox 330 ($y+5) 380 22 $desc[$i] 10 "566680"; $y += 56 }
$s += RectShape 800 398 760 300 "FFFFFF" "D5E0EF" $true; $s += TextBox 830 420 360 28 "도메인 / 구성과 담당 영역" 17 "0F1D37" $true
$s += RectShape 870 500 170 45 "FFFFFF" "D5E0EF" $true; $s += TextBox 902 512 130 24 "Member/Auth" 11 "0F1D37"
$s += RectShape 1100 500 170 45 "FFFFFF" "D5E0EF" $true; $s += TextBox 1130 512 130 24 "Subscription" 11 "0F1D37"
$s += RectShape 1325 500 170 45 "FFFFFF" "D5E0EF" $true; $s += TextBox 1350 512 130 24 "Payment/Webhook" 11 "0F1D37"
$s += LineShape 1040 522 1100 522 "2464EB"; $s += LineShape 1270 522 1325 522 "2464EB"
$s += RectShape 1045 615 170 45 "FFFFFF" "D5E0EF" $true; $s += TextBox 1085 627 130 24 "Admin API" 11 "0F1D37"
$s += RectShape 1270 615 170 45 "FFFFFF" "D5E0EF" $true; $s += TextBox 1308 627 130 24 "Admin Chat" 11 "0F1D37"
$s += LineShape 1185 545 1128 615 "2464EB"; $s += LineShape 1185 545 1350 615 "2464EB"
$slides += $s

$s = ""
$s += RectShape 0 0 1672 941 "F8FBFF"; $s += TextBox 70 35 420 26 "김병규 Backend Engineer Portfolio" 10 "71829A"; $s += TextBox 1420 35 210 26 "Univ-US · Payment Flow 04" 10 "566680"
$s += TextBox 100 95 650 58 "구독 · 결제 설계 흐름" 31 "0F1D37" $true; $s += TextBox 110 160 680 28 "PortOne 결제 흐름 및 웹훅 처리, 상태 전이 구조" 14 "566680"
$s += RectShape 100 205 1488 295 "FFFFFF" "D5E0EF" $true
$steps=@("Prepare`n결제 준비 정보 생성","Payment`nPortOne 결제창 호출","Verify`n결제 검증 및 확정 처리","Webhook`n반복 호출 대비 멱등 처리","History`n결제 이력 및 상태 반영")
$x=180; for($i=0;$i -lt 5;$i++){ $s += RectShape $x 242 210 145 "FFFFFF" "D5E0EF" $true; $parts=$steps[$i].Split("`n"); $s += TextBox ($x+55) 300 120 30 $parts[0] 15 "0F1D37" $true "c"; $s += TextBox ($x+30) 348 160 28 $parts[1] 10 "566680" $false "c"; if($i -lt 4){ $s += TextBox ($x+235) 292 55 45 "→" 26 "2464EB" $true }; $x += 280 }
$s += RectShape 156 430 1375 52 "EDF4FF" "" $true; $s += TextBox 205 445 100 22 "설계 기준" 12 "2464EB" $true; $s += TextBox 315 445 1120 24 "merchantUid를 중심으로 구독 결제 흐름 전 과정을 검증하고, 중복/실패/취소 상황에서도 일관된 상태 전이를 보장합니다." 11 "566680"
$s += RectShape 100 515 880 355 "FFFFFF" "D5E0EF" $true; $s += TextBox 160 535 260 30 "상태 전이 구조" 16 "0F1D37" $true
$states=@(@(175,590,"PENDING","2464EB"),@(470,590,"READY","2464EB"),@(765,590,"PAID","008868"),@(175,720,"FAILED","E79012"),@(470,720,"CANCELED","D93025"),@(765,720,"ACTIVE","008868"))
foreach($st in $states){ $s += RectShape $st[0] $st[1] 175 52 "F5FAFF" "D5E0EF" $true; $s += TextBox ($st[0]+35) ($st[1]+15) 110 24 $st[2] 13 $st[3] $true "c" }
$s += TextBox 380 608 80 24 "진행" 10 "566680"; $s += TextBox 662 608 90 24 "검증 성공" 10 "008868"; $s += TextBox 270 665 40 24 "실패" 10 "D93025"; $s += TextBox 565 665 40 24 "취소" 10 "D93025"; $s += TextBox 855 665 50 24 "활성화" 10 "008868"
$s += RectShape 156 798 778 58 "EDF4FF" "" $true; $s += TextBox 225 820 85 24 "정책 노트" 12 "2464EB" $true; $s += TextBox 318 824 590 24 "FAILED/PENDING은 외부 결제 취소 없이 내부 이력 상태만 CANCELED 처리합니다." 11 "566680"
$s += RectShape 1018 515 570 355 "FFFFFF" "D5E0EF" $true; $s += TextBox 1050 535 260 30 "정책 포인트" 16 "0F1D37" $true
foreach($p in @("READY 단계에서만 웹훅/후속 처리 허용","반복 웹훅은 상태 확인 후 조기 반환","결제 이력은 planName, amount 스냅샷 저장","상태 보호 케이스를 QA로 검증")){ $s += Bullet 1075 (600 + 50*[array]::IndexOf(@("READY 단계에서만 웹훅/후속 처리 허용","반복 웹훅은 상태 확인 후 조기 반환","결제 이력은 planName, amount 스냅샷 저장","상태 보호 케이스를 QA로 검증"),$p)) $p "2464EB" }
$slides += $s

$s = ""
$s += RectShape 0 0 1672 941 "F8FBFF"; $s += TextBox 70 35 420 26 "김병규 Backend Engineer Portfolio" 10 "71829A"; $s += TextBox 1420 35 190 26 "Univ-US · Troubleshooting 05" 10 "566680"
$s += TextBox 110 92 560 58 "트러블슈팅 상세" 31 "0F1D37" $true; $s += TextBox 110 155 680 28 "운영 중 문제가 되기 쉬운 흐름을 문제 · 해결 · 검증 구조로 정리" 14 "566680"
$s += RectShape 95 200 1485 320 "FFFFFF" "D5E0EF" $true; $s += RectShape 95 200 1485 92 "2464EB" "" $true; $s += TextBox 135 220 180 26 "Case 01" 13 "FFFFFF"; $s += TextBox 135 250 740 34 "플랜 변경 후 과거 결제 이력 정합성 문제" 20 "FFFFFF" $true
$labels=@("문제","해결","검증"); $texts=@("플랜 수정 후 과거 결제 이력이 최신 플랜명/가격으로 조회되는 정합성 문제","결제 이력에 결제 시점의 planName, amount 스냅샷 컬럼 저장","플랜 변경 후 SQL 재조회로 당시 값 유지 확인")
$y=310; for($i=0;$i -lt 3;$i++){ $s += RectShape 125 $y 1425 55 "FFFFFF" "D5E0EF" $true; $s += TextBox 245 ($y+14) 80 24 $labels[$i] 13 @("B91C1C","2464EB","008868")[$i] $true; $s += TextBox 460 ($y+14) 900 24 $texts[$i] 12 "566680"; $y += 72 }
$cases=@(@(95,545,720,"PortOne 웹훅 반복 호출 대응","동일 merchantUid 웹훅 반복 호출 시 중복 처리 위험","READY 상태만 처리하고 나머지는 조기 반환하는 멱등 처리","동일 웹훅 반복 호출 후 CANCELED 이력 1건 유지 확인","008868"),@(840,545,740,"Redis 기반 관리자 단일 세션 정책","관리자 다중 브라우저 로그인 시 운영 리스크","accessToken session id와 Redis auth:admin-session 비교, 충돌 시 409 및 forceLogin 처리","다른 브라우저 로그인 시 409 충돌 응답 및 세션 교체 확인","6D28D9"))
foreach($c in $cases){ $s += RectShape $c[0] $c[1] $c[2] 315 "FFFFFF" "D5E0EF" $true; $s += RectShape $c[0] $c[1] $c[2] 88 $c[5] "" $true; $s += TextBox ($c[0]+40) ($c[1]+18) 120 26 ($(if($c[0] -eq 95){"Case 02"}else{"Case 03"})) 13 "FFFFFF"; $s += TextBox ($c[0]+40) ($c[1]+48) 560 34 $c[3] 19 "FFFFFF" $true; $yy=$c[1]+115; for($i=0;$i -lt 3;$i++){ $s += RectShape ($c[0]+30) $yy ($c[2]-60) 48 "FFFFFF" "D5E0EF" $true; $s += TextBox ($c[0]+125) ($yy+12) 70 22 $labels[$i] 12 @("B91C1C","2464EB","008868")[$i] $true; $s += TextBox ($c[0]+235) ($yy+12) ($c[2]-300) 22 @($c[4],$c[5],$c[6])[$i] 10 "566680"; $yy += 65 } }
$slides += $s

$s = ""
$s += RectShape 0 0 1672 941 "F8FBFF"; $s += TextBox 70 35 420 26 "김병규 Backend Engineer Portfolio" 10 "71829A"; $s += TextBox 1430 35 180 26 "Univ-US · QA Evidence 06" 10 "566680"
$s += TextBox 110 92 560 58 "검증 및 운영 관점" 31 "0F1D37" $true; $s += TextBox 110 155 780 28 "구현 결과를 SQL 조회, 반복 호출, Redis 충돌 재현으로 확인" 14 "566680"
$s += RectShape 110 220 1450 450 "FFFFFF" "D5E0EF" $true; $s += RectShape 110 220 1450 58 "061833" "" $true
$heads=@("검증 항목","재현 조건","확인 방법","기대 결과"); $x=@(160,430,780,1180); for($i=0;$i -lt 4;$i++){ $s += TextBox $x[$i] 238 230 25 $heads[$i] 12 "FFFFFF" $true }
$rows=@(
@("결제 준비","동일 계정에서 prepare 재시도","Swagger/API로 prepare 호출","새 PENDING/READY 생성, 중복 방지"),
@("결제 검증","PortOne 결제 이후 verify 호출","Swagger/API로 verify 호출","PAID/ACTIVE 상태 전환 및 거래 정보 저장"),
@("웹훅 멱등","동일 merchantUid 웹훅 반복 호출","동일 payload 재전송","중복 처리 없이 1회 반영"),
@("상태 보호","PAID/ACTIVE 또는 이미 CANCELED된 건","취소 API 또는 검증 API 호출","결제 상태 변경 안 됨, CANCEL 거부"),
@("실패 처리","FAILED, PENDING 조합 케이스","검증 실패/취소 요청 시나리오 재현","내부 이력 상태만 CANCELED 처리"),
@("관리자 세션","다중 브라우저에서 동일 관리자 로그인","Redis session id 비교 및 forceLogin 발생","이전 세션 종료, 새 세션만 유지")
)
$y=300; foreach($r in $rows){ $s += TextBox 160 $y 230 26 $r[0] 11 "0F1D37" $true; $s += TextBox 430 $y 300 26 $r[1] 10 "566680"; $s += TextBox 780 $y 350 26 $r[2] 10 "566680"; $s += TextBox 1180 $y 330 26 $r[3] 10 "566680"; $y += 58 }
$cards=@(@("SQL 검증","결제 이력, 상태 값, 스냅샷 컬럼 재조회"),@("Swagger 반복 호출","웹훅/취소/검증 API 재현"),@("Redis 세션 충돌","관리자 중복 로그인과 forceLogin 확인"))
$x=110; foreach($c in $cards){ $s += RectShape $x 705 455 125 "FFFFFF" "D5E0EF" $true; $s += TextBox ($x+150) 738 240 28 $c[0] 17 "0F1D37" $true; $s += TextBox ($x+150) 780 250 28 $c[1] 10 "566680"; $x += 500 }
$slides += $s

$s = ""
$s += RectShape 0 0 1672 941 "F8FBFF"; $s += TextBox 70 35 420 26 "김병규 Backend Engineer Portfolio" 10 "71829A"; $s += TextBox 1480 35 120 26 "Project 2 · GRIP" 10 "566680"
$s += TextBox 110 90 620 60 "Project 2. GRIP" 36 "0F1D37" $true; $s += TextBox 110 155 620 30 "클라이밍장 지도 기반 정보 · 커뮤니티 서비스" 15 "566680"
$s += RectShape 80 195 1505 148 "061833" "" $true; $s += TextBox 120 235 240 40 "GRIP" 25 "FFFFFF" $true; $s += TextBox 120 290 360 26 "2024.07 - 2024.09 · 4인 팀 · Backend" 12 "DDE8F8"; $s += TextBox 585 240 840 65 "서울 클라이밍장 약 100곳을 지도 기반으로 제공하고, 게시글/댓글/좋아요/통합 검색 등 사용자 상호작용을 지원한 서비스입니다." 14 "DDE8F8"
$items=@(@(80,370,"지도 조회 API","Naver Maps / 지역검색 API 연동, 마커와 상세 이동 흐름 구현"),@(590,370,"혼잡도 연동","마커 정보창과 상세 페이지에 시간대별 혼잡도 정보 표시"),@(1100,370,"좋아요 토글","userId + postId 기준 중복 등록 방지, 비동기 반영"))
foreach($it in $items){ $s += RectShape $it[0] $it[1] 475 145 "FFFFFF" "D5E0EF" $true; $s += TextBox ($it[0]+150) ($it[1]+35) 260 28 $it[2] 17 "0F1D37" $true; $s += TextBox ($it[0]+150) ($it[1]+75) 280 50 $it[3] 11 "566680" }
$s += RectShape 80 540 1505 130 "FFFFFF" "D5E0EF" $true; $flow=@("Search API`n클라이밍장 수집","DB/API`n지도 데이터 제공","Naver Map`n마커·정보창","Crowding`n시간대별 혼잡도","Detail`n상세/게시글 연결"); $x=115; foreach($f in $flow){ $p=$f.Split("`n"); $s += TextBox $x 575 145 26 $p[0] 12 "0F1D37" $true "c"; $s += TextBox $x 610 145 40 $p[1] 10 "566680" $false "c"; if($x -lt 1300){ $s += TextBox ($x+165) 590 40 30 "→" 21 "008868" $true }; $x += 295 }
$s += RectShape 80 695 1505 130 "FFFFFF" "D5E0EF" $true; $s += TextBox 180 735 180 36 "트러블슈팅" 21 "0F1D37" $true; $s += TextBox 410 720 440 30 "01 좋아요 중복 등록 방지" 15 "2464EB" $true; $s += TextBox 410 755 450 46 "기존 좋아요 조회 후 생성/취소를 분기하는 토글 방식을 적용하고 반복 클릭 시 상태 일관성을 검증했습니다." 10 "566680"; $s += TextBox 960 720 430 30 "02 지도 조회와 혼잡도 연동" 15 "008868" $true; $s += TextBox 960 755 470 46 "목록 조회와 마커 클릭 흐름을 분리하고, 혼잡도 API 호출 결과를 정보창과 상세 페이지에 반영했습니다." 10 "566680"
$slides += $s

$s = ""
$s += RectShape 0 0 1672 941 "F8FBFF"; $s += TextBox 90 35 420 26 "BACKEND ENGINEER PORTFOLIO" 11 "566680"; $s += TextBox 1450 35 140 26 "Portfolio Link 08" 11 "566680"
$s += TextBox 140 115 760 60 "포트폴리오 확인 포인트" 36 "0F1D37" $true; $s += TextBox 140 190 1260 35 "온라인 포트폴리오에서 프로젝트 상세와 트러블슈팅 과정을 더 자세히 확인할 수 있습니다." 18 "566680"
$s += RectShape 120 228 1430 292 "FFFFFF" "D5E0EF" $true; $s += RectShape 165 275 94 94 "E5FAF5" "" $true; $s += TextBox 184 305 60 28 "WEB" 15 "008868" $true
$s += TextBox 305 275 760 34 "온라인 포트폴리오에서 더 자세히 볼 수 있는 내용" 21 "0F1D37" $true; $s += LineShape 305 325 1460 325 "D5E0EF"
foreach($b in @(@(305,350,"프로젝트별 상세 역할과 구현 화면"),@(305,388,"트러블슈팅 원인·해결·검증 과정"),@(305,426,"시스템 / AWS 구성도와 시퀀스 다이어그램"),@(905,350,"결제·세션·웹훅 검증 이미지"),@(905,388,"GitHub 저장소와 코드 흐름"),@(905,426,"Univ-US / GRIP 프로젝트 상세 설명"))){ $s += Bullet $b[0] $b[1] $b[2] }
$s += RectShape 120 548 1430 230 "11203D" "588BD9" $true; $s += TextBox 190 590 300 45 "Portfolio" 25 "FFFFFF" $true; $s += TextBox 190 645 560 30 "https://kbg-dev-portfolio.vercel.app" 15 "5BA0FF"; $s += TextBox 190 695 85 24 "GitHub" 12 "FFFFFF"; $s += TextBox 280 695 300 24 "github.com/Kim-ByeongGyu" 12 "DDE8F8"; $s += TextBox 190 740 85 24 "Email" 12 "FFFFFF"; $s += TextBox 280 740 300 24 "zenk5554785@gmail.com" 12 "DDE8F8"; $s += Pic 1348 585 132 132; $s += TextBox 1360 725 150 28 "Portfolio QR" 14 "DDE8F8"
$slides += $s

for($i=1;$i -le $slides.Count;$i++){
  Save-Text (Join-Path $work "ppt\slides\slide$i.xml") (SlideXml $slides[$i-1])
}

Save-Text (Join-Path $work "[Content_Types].xml") @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/><Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/><Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/><Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
$(($slides | ForEach-Object -Begin {$n=1} -Process {"<Override PartName=`"/ppt/slides/slide$n.xml`" ContentType=`"application/vnd.openxmlformats-officedocument.presentationml.slide+xml`"/>"; $n++}) -join "`n")
</Types>
"@

Save-Text (Join-Path $work "_rels\.rels") @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>
"@

$sldIds = ""; $rels = '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>'
for($i=1;$i -le $slides.Count;$i++){ $rid="rId$($i+1)"; $sid=255+$i; $sldIds += "<p:sldId id=`"$sid`" r:id=`"$rid`"/>"; $rels += "<Relationship Id=`"$rid`" Type=`"http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide`" Target=`"slides/slide$i.xml`"/>" }
Save-Text (Join-Path $work "ppt\presentation.xml") @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst><p:sldIdLst>$sldIds</p:sldIdLst><p:sldSz cx="12192000" cy="6858000" type="screen16x9"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>
"@
Save-Text (Join-Path $work "ppt\_rels\presentation.xml.rels") @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">$rels</Relationships>
"@

Save-Text (Join-Path $work "ppt\slideMasters\slideMaster1.xml") @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="1" r:id="rId1"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle/><p:bodyStyle/><p:otherStyle/></p:txStyles></p:sldMaster>
"@
Save-Text (Join-Path $work "ppt\slideMasters\_rels\slideMaster1.xml.rels") @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/></Relationships>
"@
Save-Text (Join-Path $work "ppt\slideLayouts\slideLayout1.xml") @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1"><p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>
"@
Save-Text (Join-Path $work "ppt\slideLayouts\_rels\slideLayout1.xml.rels") @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/></Relationships>
"@
Save-Text (Join-Path $work "ppt\theme\theme1.xml") @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Portfolio"><a:themeElements><a:clrScheme name="Portfolio"><a:dk1><a:srgbClr val="0F1D37"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="1F2937"/></a:dk2><a:lt2><a:srgbClr val="F8FBFF"/></a:lt2><a:accent1><a:srgbClr val="2464EB"/></a:accent1><a:accent2><a:srgbClr val="008868"/></a:accent2><a:accent3><a:srgbClr val="6D28D9"/></a:accent3><a:accent4><a:srgbClr val="E79012"/></a:accent4><a:accent5><a:srgbClr val="D93025"/></a:accent5><a:accent6><a:srgbClr val="566680"/></a:accent6><a:hlink><a:srgbClr val="2464EB"/></a:hlink><a:folHlink><a:srgbClr val="6D28D9"/></a:folHlink></a:clrScheme><a:fontScheme name="Portfolio"><a:majorFont><a:latin typeface="Malgun Gothic"/><a:ea typeface="Malgun Gothic"/></a:majorFont><a:minorFont><a:latin typeface="Malgun Gothic"/><a:ea typeface="Malgun Gothic"/></a:minorFont></a:fontScheme><a:fmtScheme name="Portfolio"><a:fillStyleLst/><a:lnStyleLst/><a:effectStyleLst/><a:bgFillStyleLst/></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>
"@

for($i=1;$i -le $slides.Count;$i++){
  Save-Text (Join-Path $work "ppt\slides\_rels\slide$i.xml.rels") @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/qr.png"/></Relationships>
"@
}

Save-Text (Join-Path $work "docProps\core.xml") @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>김병규 백엔드 포트폴리오</dc:title><dc:creator>김병규</dc:creator><cp:lastModifiedBy>Codex</cp:lastModifiedBy></cp:coreProperties>
"@
Save-Text (Join-Path $work "docProps\app.xml") @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>Codex</Application><PresentationFormat>On-screen Show (16:9)</PresentationFormat><Slides>$($slides.Count)</Slides></Properties>
"@

if (Test-Path $pptxOut) { Remove-Item -LiteralPath $pptxOut -Force }
[System.IO.Compression.ZipFile]::CreateFromDirectory($work, $pptxOut)

Write-Output "PDF: $pdfOut"
Write-Output "PPTX: $pptxOut"
