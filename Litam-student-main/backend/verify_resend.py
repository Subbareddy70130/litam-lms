import resend

# REPLACE THE KEY BELOW WITH YOUR ACTUAL RESEND API KEY
resend.api_key = "re_4VTGiwMi_BcYH949cEYHsR8caFoCHw8HD"

try:
    print("Testing Resend API...")
    r = resend.Emails.send({
      "from": "onboarding@resend.dev",
      "to": "nnaidu8033@gmail.com",
      "subject": "LITAM CMS - Test Email",
      "html": "<p>If you see this, your <strong>Resend API Key</strong> is working correctly!</p>"
    })
    print("Response Success:", r)
    print("\nCheck your inbox (nnaidu8033@gmail.com) and Spam folder.")
except Exception as e:
    print("\n!!! RESEND ERROR !!!")
    print(e)
    print("\nCommon issues:")
    print("1. API Key is incorrect.")
    print("2. Resend Free Tier only allows sending to your own email address.")
    print("3. Check if 'onboarding@resend.dev' is allowed as the 'from' address.")
