import { execSync } from "child_process";
import { existsSync } from "fs";

export function sendText(phone: string, message: string): boolean {
  const escaped = message.replace(/"/g, '\\"').replace(/\n/g, "\\n");
  const script = `
    tell application "Messages"
      set targetService to 1st account whose service type = iMessage
      set targetBuddy to participant "${phone}" of targetService
      send "${escaped}" to targetBuddy
    end tell
  `;
  try {
    execSync(`osascript -e '${script.replace(/'/g, "'\\''")}'`, {
      timeout: 15000,
    });
    return true;
  } catch (e) {
    console.error(`Failed to send text to ${phone}:`, (e as Error).message);
    return false;
  }
}

export function sendImage(phone: string, imagePath: string): boolean {
  if (!existsSync(imagePath)) {
    console.error(`Image not found: ${imagePath}`);
    return false;
  }
  const absPath = imagePath.startsWith("/")
    ? imagePath
    : `${process.cwd()}/${imagePath}`;
  const script = `
    tell application "Messages"
      set targetService to 1st account whose service type = iMessage
      set targetBuddy to participant "${phone}" of targetService
      send POSIX file "${absPath}" to targetBuddy
    end tell
  `;
  try {
    execSync(`osascript -e '${script.replace(/'/g, "'\\''")}'`, {
      timeout: 30000,
    });
    return true;
  } catch (e) {
    console.error(`Failed to send image to ${phone}:`, (e as Error).message);
    return false;
  }
}

export function composeOutreachMessage(businessName: string): string {
  return `Hey! I'm Neel, a recent grad from UPenn Wharton and I help small businesses create websites. Some examples include neelrjain.com and source-accounting.com.

I came across ${businessName} and spent some time putting together a website concept for you (see attached). I'd love to get your feedback and any thoughts — would you be interested in seeing the full website? This is just a template, and I'd be happy to adapt it based on your content, photos, colors, and ideas.

Let me know! Feel free to reach me via email, call, or text.

Best,
Neel
9713477778`;
}

export function sendOutreach(
  phone: string,
  businessName: string,
  mockupPath: string,
): boolean {
  const message = composeOutreachMessage(businessName);

  const imgSent = sendImage(phone, mockupPath);
  if (!imgSent) return false;

  // Small delay between image and text
  execSync("sleep 2");
  return sendText(phone, message);
}

// CLI mode
if (process.argv[1]?.endsWith("imessage.ts")) {
  const args = process.argv.slice(2);
  if (args[0] === "--test" && args[1]) {
    const phone = args[1];
    console.log(`Sending test message to ${phone}...`);
    const ok = sendText(phone, "Test from SMB Agency autopilot 🚀");
    console.log(ok ? "Sent!" : "Failed.");
  } else {
    console.log("Usage: npx tsx scripts/imessage.ts --test <phone>");
  }
}
