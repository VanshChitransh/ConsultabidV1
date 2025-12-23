import { env } from './env';

type TriggerEstimateRequest = {
  pdfId: string;
  r2Url: string;
};

export type TriggerEstimateResponse = {
  estimateUrl: string;
  summary?: {
    total_estimate?: number;
  };
  extraction?: Record<string, unknown>;
};

const shouldMock = env.AI_ENGINE_MOCK.toLowerCase() === 'true';

export const triggerEstimate = async ({
  pdfId,
  r2Url,
}: TriggerEstimateRequest): Promise<TriggerEstimateResponse> => {
  if (shouldMock) {
    return {
      estimateUrl: `${r2Url}?mock=estimate`,
      summary: { total_estimate: 0 },
      extraction: { pdfId, mocked: true },
    };
  }

  const response = await fetch(`${env.AI_ENGINE_URL}/v1/process-estimate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pdfId, r2Url }),
  });

  if (!response.ok) {
    throw new Error(`AI engine request failed (${response.status})`);
  }

  return (await response.json()) as TriggerEstimateResponse;
};
