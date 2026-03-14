export interface AffinitySubmissionPayload {
  name: string;
  email: string;
  dominantResult: string;
  secondaryResult: string | null;
  scores: Record<string, number>;
  subscribed: boolean;
  mode: "quiz" | "random";
}

export type AffinitySubmissionOutcome = "saved" | "failed" | "skipped";

const WEBHOOK_TIMEOUT_MS = 8000;

export async function submitAffinityToWebhook(
  payload: AffinitySubmissionPayload,
): Promise<AffinitySubmissionOutcome> {
  const endpoint =
    process.env.NEXT_PUBLIC_GAS_WEBHOOK_URL?.trim() ||
    process.env.NEXT_PUBLIC_AFFINITY_WEBHOOK_URL?.trim() ||
    "https://script.google.com/macros/s/AKfycby91JQLzjqMfiW-5sTQ6X8potfntyLlvEFMPF0L6v9RwUuh_N-fOlQ7oSfJn1I2k3QEcQ/exec";

  if (!endpoint) {
    return "skipped";
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
  const body = JSON.stringify({
    ...payload,
    submittedAt: new Date().toISOString(),
  });

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        // text/plain avoids CORS preflight with Apps Script endpoints.
        "Content-Type": "text/plain;charset=utf-8",
      },
      body,
      signal: controller.signal,
    });

    return response.ok ? "saved" : "failed";
  } catch {
    try {
      // Best-effort fallback for deployments that still block CORS reads.
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body,
      });

      return "saved";
    } catch {
      return "failed";
    }
  } finally {
    clearTimeout(timeout);
  }
}
