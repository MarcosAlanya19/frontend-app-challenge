export interface APIError {
  success: false;
  data: {
    name:
      | "DUPLICATE_DNI"
      | "DUPLICATE_PHONE"
      | "DUPLICATE_EMAIL"
      | "INVALID_PHONE"
      | "SERVER_ERROR";
    title: string;
    message: string;
  };
}

export interface APIResponse<T> {
  success: true;
  data: T;
}
