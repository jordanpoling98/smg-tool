import { useState } from "react";

export default function PromoEmailCopier() {
  const [caseText, setCaseText] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [copied, setCopied] = useState(false);

  const generateEmail = () => {
    const emailMatch = caseText.match(/Email\s*:\s*(\S+@\S+)/i);
    const complaintMatch = caseText.match(/\"(.*?)\"/s);

    const guestEmail = emailMatch ? emailMatch[1] : "[email not found]";
    const complaint = complaintMatch ? complaintMatch[1] : "[complaint not found]";

    const generatedSubject = "Papa Johns: Apology + compensation";
    const generatedBody = `Thank you for your business and taking the time to send us your feedback. I sincerely apologize for the issue you had: ${complaint}.

I hope you will give us another opportunity to earn your future business. Below is an online promo code, good for a **free large 3 topping pizza**.

Online Promo Code: [PASTE CODE HERE]

Please let me know if you have any other comments/questions/concerns, or if there's anything else we can do for you.

Have a great day!`;

    setEmail(guestEmail);
    setSubject(generatedSubject);
    setBody(generatedBody);
  };

  const copyToClipboard = () => {
    const fullText = `Email address: ${email}\n\nSubject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
      <div>
        <label><strong>Paste SMG Case Text:</strong></label>
        <textarea
          style={{ width: "100%", height: "150px" }}
          placeholder="Paste full SMG case export here..."
          value={caseText}
          onChange={(e) => setCaseText(e.target.value)}
        />
        <button onClick={generateEmail} style={{ marginTop: "0.5rem" }}>Generate Email</button>
      </div>

      {email && (
        <div style={{ marginTop: "2rem" }}>
          <div>
            <label><strong>To:</strong></label>
            <input style={{ width: "100%" }} readOnly value={email} />
          </div>
          <div>
            <label><strong>Subject:</strong></label>
            <input style={{ width: "100%" }} readOnly value={subject} />
          </div>
          <div>
            <label><strong>Body:</strong></label>
            <textarea style={{ width: "100%", height: "250px" }} readOnly value={body} />
          </div>
          <button onClick={copyToClipboard} style={{ marginTop: "0.5rem" }}>
            {copied ? "Copied!" : "Copy All to Clipboard"}
          </button>
        </div>
      )}
    </div>
  );
}
