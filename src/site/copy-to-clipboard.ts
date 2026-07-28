/**
 * Copy text, with a fallback for contexts where the async Clipboard API is
 * unavailable — it needs a secure context, and the site is served over plain
 * HTTP at ui.zenadmin.co, so `navigator.clipboard` is undefined there. Without
 * the fallback every copy button on the deployed site does nothing.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Blocked (insecure context, no focus, denied permission) — fall through.
  }

  try {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    // Off-screen but focusable, and no scroll jump on focus.
    area.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  } catch {
    return false
  }
}
