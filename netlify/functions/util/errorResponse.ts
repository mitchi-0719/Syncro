export const errorResponse = (statusCode: number, message: string) => {
  return {
    statusCode,
    body: JSON.stringify({ error: message }),
  };
};
