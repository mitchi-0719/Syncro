export const errorResponse = (statusCode: number, message: string) => {
  return {
    statusCode,
    body: { error: message },
  };
};
