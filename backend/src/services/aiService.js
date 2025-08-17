// This will later integrate with AI model (OpenAI / custom model)
const summarizeText = async (text) => {
  // Dummy implementation for now
  return `Summary of: ${text.substring(0, 50)}...`;
};

export default { summarizeText };
