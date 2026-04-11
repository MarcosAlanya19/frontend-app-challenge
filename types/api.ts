export interface APIError {
  success: false;
  data: {
    name: "DUPLICATE_DNI" | "INVALID_PHONE" | "SERVER_ERROR";
    title: string;
    message: string;
  };
}

export interface APIResponse<T> {
  success: true;
  data: T;
}
