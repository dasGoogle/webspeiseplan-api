export class HTTPClient {
  private BASE_HEADERS = {
    Referer: "https://swp.webspeiseplan.de/Menu",
  };

  async getJSON<T>(url: string): Promise<T> {
    // ... implementation here
    const response = await fetch(url, {
      headers: { ...this.BASE_HEADERS },
    });

    const data = (await response.json()) as T;
    return data;
  }
}

class CachedResponse<T> {
  url: string;
  timestamp = new Date();
  response: T;
  constructor(url: string, response: T) {
    this.url = url;
    this.response = response;
  }

  isFresh(timeout: number): boolean {
    return new Date().getTime() - this.timestamp.getTime() < timeout;
  }
}

export class CachedHTTPClient extends HTTPClient {
  private cache: { [key: string]: CachedResponse<unknown> } = {};
  timeout: number = 1000 * 60 * 10; // 10 minutes
  cleanupScaler = 2;

  constructor() {
    super();
    setInterval(() => this.cleanupCache(), this.timeout * this.cleanupScaler);
  }

  cleanupCache() {
    Object.keys(this.cache).forEach((key) => {
      const cachedResponse = this.cache[key];
      if (!cachedResponse.isFresh(this.timeout)) {
        delete this.cache[key];
      }
    });
  }

  async getJSON<T>(url: string): Promise<T> {
    if (this.cache[url]) {
      const cachedResponse = this.cache[url];
      if (cachedResponse.isFresh(this.timeout)) {
        return cachedResponse.response as T;
      }
    }
    const response = await super.getJSON<T>(url);
    this.cache[url] = new CachedResponse(url, response);
    return response;
  }
}
