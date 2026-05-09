declare module "translate-google" {
  type TranslateOptions = {
    from?: string;
    to?: string;
    raw?: boolean;
    tld?: string;
    client?: string;
  };

  export default function translate(
    text: string,
    options?: TranslateOptions,
  ): Promise<string>;
}
