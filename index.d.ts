import { createFilter } from "rollup-pluginutils";
import { Plugin } from "rollup";

interface Options {
  include: Parameters<typeof createFilter>[0];
  exclude: Parameters<typeof createFilter>[1];

  compress: boolean | ((code: string) => string | Record<any, any>);
}

declare const glslify: (options?: Partial<Options>) => Plugin;

export default glslify;
