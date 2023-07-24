export class ResendClient {
  constructor(key) {
    this.key = key;
    this.baseURL = "http://localhost:9999"; // change to server URL
    this.headers = {
      Authorization: `Bearer ${this.key}`,
      "Content-Type": "application/json",
    };
  }

  async sendEmail(data) {
    const path = `${this.baseURL}/send-mail`;
    const requestOptions = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(path, requestOptions);
      return response;
    } catch (err) {
      return err;
    }
  }
}
