/**
 * Flayyer types to improve the developer experience.
 *
 * Visit {@link https://github.com/flayyer/flayyer-types} for more information about this types.
 */

/* eslint-disable @typescript-eslint/ban-types */

/**
 * Recursive query-string serializable object.
 * Kudos to this person: https://stackoverflow.com/a/57859435
 */
export type FlayyerSerializable<V> = V extends string | number | boolean | Date
  ? string | undefined
  : V extends null | undefined
  ? V
  : V extends Function
  ? never
  : V extends object
  ? { [K in keyof V]: FlayyerSerializable<V[K]> }
  : string | undefined;

/**
 * Some popular user-agents but not limited to this list.
 * Future agents will be added over time.
 */
export enum FlayyerAgentName {
  FACEBOOK = "facebook",
  MESSENGER = "messenger",
  WHATSAPP = "whatsapp",
  INSTAGRAM = "instagram",
  LINKEDIN = "linkedin",
  PINTEREST = "pinterest",
  TELEGRAM = "telegram",
  TWITTER = "twitter",
  BING = "bing",
  REDDIT = "reddit",
  GOOGLE = "google",
  GOOGLE_ADS = "google ads",
  AMAZON_ALEXA = "amazon alexa",
  AMAZON = "amazon",
  YANDEX = "yandex",
  YAHOO = "yahoo",
  HUBSPOT = "hubspot",
  MSN = "msn",
  ZOOM = "zoom",
  SLACK = "slack",
  DISCORD = "discord",
  SAFARI = "safari",
  FLIPBOARD = "flipboard",
  APPLE = "apple",
  DUCKDUCKGO = "duckduckgo",
  DISQUS = "disqus",
}

export type FlayyerAgent = {
  name?: FlayyerAgentName | string;
};

/**
 * There are the values your templates will receive when they are going to be rendered.
 * Please note any value of the `variables` object is going to be a `string`, so if you expect a number you need to parse it `Number(variable.number)` or similar methods.
 *
 * The props `width` and `height` are always present and they are numbers representing the pixels of the viewport. Anything that overflows this won't be rendered.
 *
 * To tell the rendering engine your template is ready you can set any html element with a **css class: `flayyer-ready`**.
 * If no `flayyer-ready` class is set: the image will be declared ready a couple of milliseconds after there is no more network activity.
 *
 * - Visit {@link https://github.com/flayyer/flayyer-types} for more information about this types.
 * - Visit {@link https://docs.flayyer.com} for the complete documentation.
 * - Visit {@link https://flayyer.com} to create a Flayyer account.
 *
 * @example <caption>Example usage on React.js</caption>
 * function Template({ width, height, agent, variables, locale = "en" }: TemplateProps) {}
 *
 * @hideconstructor
 * @copyright Flayyer 2021
 */
export class TemplateProps<Variables = { [key: string]: string }> {
  /**
   * Provided variables parsed from the query-string of the smart Flayyer URL.
   * This object has been decoded and parsed, but keep in mind that every variable is a `string`, `object` or an `array`.
   * If you expect a number please convert the value from string to number. Eg: `Number(variable.count)`
   * @example <caption>Example without explicit variables</caption>
   * function Template({ variables }: TemplateProps) {}
   * @example <caption>Example with explicit typed variables</caption>
   * function Template({ variables }: TemplateProps<{ title: string, count: string }>) {
   *   const count = Number(variables.count); // Always parse string to number
   *   return (<Content>{variables.title} - {count}</Content>);
   * }
   */
  variables!: {
    // Taken from `Partial<K>` source code
    [P in keyof Variables]: FlayyerSerializable<Variables[P]> | undefined;
  };

  /**
   * Represents the crawler of the site where a link was posted.
   * @example <caption>Example with conditional rendering</caption>
   * function Template({ agent, variables }: TemplateProps) {
   *   if (agent.name === "whatsapp") {
   *     // Rendered as squared template
   *   }
   * }
   */
  agent!: FlayyerAgent;

  /**
   * Probably the viewer's locale but can depend on many factors such as proxies or web browsers.
   * Take this value with a grain of salt.
   * If no locale was present the value by default is `undefined` which is safe for native `Intl` modules.
   */
  locale?: string;

  /**
   * @deprecated Use `locale` instead.
   */
  lang?: string;

  /**
   * Viewport and image width dimension in pixels.
   */
  width!: number;
  /**
   * Viewport and image width dimension in pixels.
   */
  height!: number;

  /**
   * User-provided ID to identify the template on future analytic reports
   */
  id?: string;
  /**
   * User-provided tags to identify the template on future analytic reports
   */
  tags?: string[];
}

export type UserAgentSize = [number, number];

export const Sizes = {
  /**
   * Smallest size, usually for WhatsApp: `[400, 400]`
   */
  THUMBNAIL: [400, 400] as UserAgentSize,
  /**
   * Most common size for og:image and twitter:image, this is the most universal of all: `[1200, 630]`
   */
  BANNER: [1200, 630] as UserAgentSize,
  /**
   * For sites such as Pinterest: `[800, 1200]`
   */
  VERTICAL: [800, 1200] as UserAgentSize,
  /**
   * To export to Instagram post format: `[1080, 1080]`
   */
  SQUARE: [1080, 1080] as UserAgentSize,
  /**
   * To export to story format in platforms such as Instagram, Facebook and Twitter: `[1080, 1920]`
   */
  STORY: [1080, 1920] as UserAgentSize,
};

export type FlayyerConfig = {
  /**
   * Engine/framework used to develop the templates.
   */
  engine: "react" | "react-typescript" | "vue" | "vue-typescript";

  /**
   * **This field is required:** `FLAYYER_KEY` api key to identify your tenant/company on flayyer.com.
   * Get your key at {@link https://flayyer.com/dashboard/_/settings}.
   *
   * By default you can set this field to `process.env.FLAYYER_KEY` and read the value from the environment, but remember to use `dotenv`.
   *
   * - To setup automatic deploys you can use a CI like Github Actions, see guide here: {@link https://docs.flayyer.com/docs/advanced/automatic-deploys}
   *
   * @default process.env.FLAYYER_KEY
   */
  key: string;

  /**
   * Identifier of this deck of templates in your tenant/company account. **Only lowercase letters, numbers and dashes are allowed**.
   *
   * **This will create a new version of previous deployed instances of this code.**
   * You can always refer a specific version by setting the `version` field, see {@link https://docs.flayyer.com/docs/concepts#url-anatomy}
   *
   * - `my-project-1`: OK
   * - `My Project`: INVALID
   */
  deck: string;

  /**
   * Optional user friendly name.
   */
  name?: string | null;
  /**
   * Optional user friendly description, Markdown is allowed.
   */
  description?: string | null;
};

/**
 * This is optional but will help your IDE with IntelliSense to autocomplete and hint you.
 * See {@link https://docs.flayyer.com/docs/cli/flayyer-cli#flayyerconfigjs} for more info.
 */
export function config(params: FlayyerConfig): FlayyerConfig {
  // TODO: validate
  return params;
}
