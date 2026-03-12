$codes = @(
"YDS-3XNX-TTA3",
"YDS-WPV2-7XMR",
"YDS-T5VK-33LT",
"YDS-2H4F-UPKK",
"YDS-MHSX-3TNK",
"YDS-BTME-KAG5",
"YDS-C28Y-7UZ9",
"YDS-QK7M-TWL9",
"YDS-RXSW-79DM",
"YDS-3NQD-8PKG",
"YDS-CMLQ-TEQ9",
"YDS-XAX3-A6UY",
"YDS-FA7M-H4P3",
"YDS-WYJ8-RGUV",
"YDS-U7UD-K5D4",
"YDS-LZQ2-EU4S",
"YDS-D542-PWWD",
"YDS-MNML-Z3JY",
"YDS-5J5M-UNTL",
"YDS-ULKD-USVG"
)

foreach ($code in $codes) {
    Write-Host "Uploading $code..."
    firebase firestore:documents:set "promo_codes/$code" "{'used': false, 'days': 365}" --project ydsgrammar
}
