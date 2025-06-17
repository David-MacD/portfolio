import type { FunctionComponent, PropsWithChildren } from "react";
import type {
  Orientation,
  PageSize,
  PageLayout,
  PageMode,
  SVGPresentationAttributes,
} from "@react-pdf/types";
import {
  Document as PDFDocument,
  Page as PDFPage,
  View as PDFView,
  Text as PDFText,
  Link as PDFLink,
  Image as PDFImage,
  Svg as PDFSvg,
  Path as PDFPath,
  Circle as PDFCircle,
  CircleProps as PDFCircleProps,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import tailwindConfig from "#tailwind-config";
// import twToObject from "tailwind-to-object";
import { twMerge } from "tailwind-merge";

const twToObject = createTw(tailwindConfig, {
  // Set the base font size in points (see note below regarding units)
  ptPerRem: 12,
});

const tw = (className: string | undefined) => {
  if (className) {
    const styles = twToObject(className);
    // console.log(JSON.stringify(styles));
    return styles;
  }
  return {};
};

type DocumentProps = PropsWithChildren<{
  className?: string;
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  producer?: string;
  creationDate?: Date;
  modificationDate?: Date;
  pageLayout?: PageLayout;
  pageMode?: PageMode;
}>;
type PageProps = PropsWithChildren<{
  className?: string;
  wrap?: boolean;
  size?: PageSize;
  orientation?: Orientation;
  dpi?: number;
}>;
type TextProps = PropsWithChildren<{
  className?: string;
}>;
type LinkProps = PropsWithChildren<{
  className?: string;
  href: string;
}>;
type ImageProps = PropsWithChildren<{
  className?: string;
  src: string;
}>;
type ViewProps = PropsWithChildren<{
  className?: string;
}>;
type SvgProps = PropsWithChildren<{
  className?: string;
  width?: string | number;
  height?: string | number;
  viewBox?: string;
  preserveAspectRatio?: string;
}>;
type PathProps = PropsWithChildren<
  {
    className?: string;
    style?: SVGPresentationAttributes;
    d: string;
  } & SVGPresentationAttributes
>;

type CircleProps = React.PropsWithChildren<{
  className?: string;
  cx?: string | number;
  cy?: string | number;
  r: string | number;
}>;

// const tw = createTw(tailwindConfig);

/**
 * Renders a document that adapts to the rendering environment.
 *
 * In an HTML context, it renders a `<main>` element with the provided className
 * and additional props. In a PDF context, it renders a `PDFDocument` with
 * Tailwind styles applied.
 *
 * @param {DocumentProps} props - The component props.
 * @returns {JSX.Element} The rendered document component.
 */

export const Document: FunctionComponent<DocumentProps> = ({
  className,
  children,
  ...rest
}) => {
  const cn = twMerge([
    "relative left-0 right-0 flex min-h-full flex-col p-4 text-base",
    className,
  ]);
  // @ts-expect-error isHTML global should be a boolean, but can't be guaranteed
  if (globalThis.isHTML) {
    return (
      <main className={cn} {...rest}>
        {children}
      </main>
    );
  }

  const twStyles = tw(cn);
  return (
    <PDFDocument style={twStyles} {...rest}>
      {children}
    </PDFDocument>
  );
};

export const Page: FunctionComponent<PageProps> = ({
  className,
  children,
  ...rest
}) => {
  const cn = twMerge([
    "relative left-0 right-0 flex h-[297mm] w-[210mm] flex-col bg-slate-100 shadow-lg",
    className,
  ]);
  // @ts-expect-error isHTML global should be a boolean, but can't be guaranteed
  if (globalThis.isHTML) {
    return (
      <section className={cn} {...rest}>
        {children}
      </section>
    );
  }

  const twStyles = tw(cn);
  return (
    <PDFPage style={twStyles} {...rest}>
      {children}
    </PDFPage>
  );
};

export const View: FunctionComponent<ViewProps> = ({ className, children }) => {
  const cn = twMerge(["relative left-0 right-0 flex flex-col", className]);
  // @ts-expect-error isHTML global should be a boolean, but can't be guaranteed
  if (globalThis.isHTML) {
    return <div className={cn}>{children}</div>;
  }
  const twStyles = tw(cn);
  return <PDFView style={twStyles}>{children}</PDFView>;
};

export const Text: FunctionComponent<TextProps> = ({ className, children }) => {
  const cn = twMerge(["font-outfit font-normal relative text-sm", className]);
  // @ts-expect-error isHTML global should be a boolean, but can't be guaranteed
  if (globalThis.isHTML) {
    return <div className={cn}>{children}</div>;
  }

  const twStyles = tw(cn);
  return <PDFText style={twStyles}>{children}</PDFText>;
};

export const Link: FunctionComponent<LinkProps> = ({
  className,
  href,
  children,
}) => {
  const cn = twMerge([
    "font-outfit font-normal text-teal-800 relative text-sm no-underline",
    className,
  ]);
  // @ts-expect-error isHTML global should be a boolean, but can't be guaranteed
  if (globalThis.isHTML) {
    return (
      <a className={cn} href={href}>
        {children}
      </a>
    );
  }

  const twStyles = tw(cn);
  return (
    <PDFLink style={twStyles} href={href}>
      {children}
    </PDFLink>
  );
};

export const Image: FunctionComponent<ImageProps> = ({
  className,
  src,
  ...rest
}) => {
  const cn = twMerge([
    "font-outfit font-normal text-teal-800 relative text-sm no-underline",
    className,
  ]);
  console.log(src);
  // @ts-expect-error isHTML global should be a boolean, but can't be guaranteed
  if (globalThis.isHTML) {
    return <img className={cn} src={src} {...rest} />;
  }
  const twStyles = tw(cn);
  return <PDFImage src={src} style={twStyles} {...rest} />;
};

export const Svg: FunctionComponent<SvgProps> = ({
  className,
  children,
  ...rest
}) => {
  // @ts-expect-error isHTML global should be a boolean, but can't be guaranteed
  return globalThis.isHTML ? (
    <svg className={className} {...rest}>
      {children}
    </svg>
  ) : (
    <PDFSvg style={tw(className)} {...rest}>
      {children}
    </PDFSvg>
  );
};

export const Path: FunctionComponent<PathProps> = ({
  className,
  children,
  ...rest
}) => {
  const styles = tw(className) as SVGPresentationAttributes;
  // @ts-expect-error isHTML global should be a boolean, but can't be guaranteed
  if (globalThis.isHTML) {
    const restProps: React.SVGProps<SVGPathElement> = {
      ...rest,
      strokeLinejoin: "round",
      style: {
        ...rest.style,
        ...styles,
        strokeLinejoin: "round",
      },
    };
    return <path {...restProps}>{children}</path>;
  }
  return (
    <PDFPath style={styles as SVGPresentationAttributes} {...rest}>
      {children}
    </PDFPath>
  );
};

export const Circle: FunctionComponent<CircleProps> = ({
  className,
  children,
  ...rest
}) => {
  const styles = tw(className);
  // @ts-expect-error isHTML global should be a boolean, but can't be guaranteed
  if (globalThis.isHTML) {
    return <circle {...rest}>{children}</circle>;
  }
  return (
    <PDFCircle style={styles as SVGPresentationAttributes} {...rest}>
      {children}
    </PDFCircle>
  );
};

// const adjustStyles = (style: Style) => {
//   if (!style) return;

//   Object.keys(style).forEach((key) => {
//     if (key === "paddingVertical") {
//       style.paddingTop = style[key];
//       style.paddingBottom = style[key];
//     } else if (key === "paddingHorizontal") {
//       style.paddingLeft = style[key];
//       style.paddingRight = style[key];
//     } else if (key === "fontWeight") {
//       style.fontWeight = fontWeightConverter(style[key]);
//     }
//     return style;
//   });
// };
// const mergeStylesIntoOne = (styles: Style[]) => {
//   const mergedStyle: Style = {};

//   if (!styles[0]) return mergedStyle;

//   styles.forEach((style) => {
//     Object.keys(style).forEach((key) => {
//       mergedStyle[key as keyof Style] = style[key as keyof Style];
//     });
//   });
//   return mergedStyle;
// };

// export const CustomView: FunctionComponent<PropsView> = ({
//   children,
//   style,
//   ...rest
// }) => {
//   const isDebug = rest.debug;
//   if (isHtml) {
//     let newStyle = style;
//     if (Array.isArray(style)) {
//       newStyle = mergeStylesIntoOne(style) as {
//         [key: string]: string;
//       };
//     }

//     adjustStyles(newStyle as { [key: string]: string });

//     let styles: CSSProperties = {
//       display: "flex",
//       flexDirection: "column",
//       position: "relative",
//       isolation: "isolate",
//       left: 0,
//       right: 0,
//       ...(newStyle as { [key: string]: string }),
//     };

//     if (isDebug) {
//       styles.border = "1px solid red";
//     }

//     return <div style={styles}>{children}</div>;
//   }

//   if (Array.isArray(style)) {
//     style = [
//       {
//         display: "flex",
//         flexDirection: "column",
//         position: "relative",
//         left: 0,
//         right: 0,
//       },
//       ...style,
//     ];
//   } else {
//     style = {
//       display: "flex",
//       flexDirection: "column",
//       position: "relative",
//       left: 0,
//       right: 0,
//       ...style,
//     };
//   }
//   return (
//     <View style={style} {...rest}>
//       {children}
//     </View>
//   );
// };

// export const CustomText: FC<PropsText> = ({ children, style, ...rest }) => {
//   let newStyle = style;
//   if (Array.isArray(style)) {
//     newStyle = mergeStylesIntoOne(style) as {
//       [key: string]: string;
//     };
//   }

//   if (isHtml) {
//     const isDebug = rest.debug;
//     adjustStyles(newStyle as { [key: string]: string });

//     let styles: CSSProperties = {
//       whiteSpace: "break-spaces",
//       position: "relative",
//       border: isDebug ? "1px solid red" : "none",
//       ...(newStyle as { [key: string]: string }),
//     };

//     if (isDebug) {
//       styles.border = "1px solid red";
//     }

//     return <div style={styles}>{children}</div>;
//   }

//   return (
//     <Text
//       style={{
//         verticalAlign: "sub",
//         ...newStyle,
//       }}
//       {...rest}
//     >
//       {children}
//     </Text>
//   );
// };

// export const CustomImage: FC<PropsImage> = ({ style, ...rest }) => {
//   if (isHtml) {
//     let newStyle = style;
//     if (Array.isArray(style)) {
//       newStyle = mergeStylesIntoOne(style) as {
//         [key: string]: string;
//       };
//     }
//     adjustStyles(newStyle as { [key: string]: string });
//     return (
//       <img
//         style={newStyle as { [key: string]: string }}
//         src={rest.src as string}
//       />
//     );
//   }
//   return <Image style={style} {...rest} />;
// };

// export const CustomPage: FC<PropsPage> = ({ style, children, ...rest }) => {
//   if (isHtml) {
//     let newStyle = style;
//     if (Array.isArray(style)) {
//       newStyle = mergeStylesIntoOne(style) as {
//         [key: string]: string;
//       };
//     }
//     adjustStyles(newStyle as { [key: string]: string });
//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           position: "relative",
//           isolation: "isolate",
//           height: "100%",
//           lineHeight: "initial",
//           flex: 1,
//           ...(newStyle as { [key: string]: string }),
//         }}
//       >
//         {children}
//       </div>
//     );
//   }
//   return (
//     <Page style={style} {...rest}>
//       {children}
//     </Page>
//   );
// };

// export const CustomLink: FC<PropsLink> = ({ children, style, ...rest }) => {
//   if (isHtml) {
//     let newStyle = style;
//     if (Array.isArray(style)) {
//       newStyle = mergeStylesIntoOne(style) as {
//         [key: string]: string;
//       };
//     }
//     adjustStyles(newStyle as { [key: string]: string });
//     return (
//       <a {...rest} href={rest.src} target="_blank" rel="noopener noreferrer">
//         <div style={newStyle as { [key: string]: string }}>{children}</div>
//       </a>
//     );
//   }
//   return (
//     <Link {...rest} style={style}>
//       {children}
//     </Link>
//   );
// };

// export const CustomG: FC<PropsG> = ({ children, ...rest }) => {
//   if (isHtml) {
//     let adjustedRest: React.SVGProps<SVGGElement> & { style?: CSSProperties } =
//       {
//         ...rest,
//         strokeLinejoin: "round",
//         style: {
//           strokeLinejoin: "round",
//         },
//       };

//     return <g {...adjustedRest}>{children}</g>;
//   }
//   return <G {...rest}>{children}</G>;
// };

// export const CustomPath: FC<PropsPath> = ({ children, ...rest }) => {
//   if (isHtml) {
//     let adjustedRest:
//       | React.SVGProps<SVGPathElement>
//       | { style?: CSSProperties } = {
//       ...rest,
//       strokeLinejoin: "round",
//       style: {
//         ...rest.style,
//         strokeLinejoin: "round",
//       },
//     };

//     return <path {...adjustedRest}>{children}</path>;
//   }
//   return <Path {...rest}>{children}</Path>;
// };

// export const CustomRect: FC<PropsRect> = ({ children, ...rest }) => {
//   if (isHtml) {
//     let adjustedRest: React.SVGProps<SVGRectElement> & {
//       style?: CSSProperties;
//     } = {
//       ...rest,
//       strokeLinejoin: "round",
//       style: {
//         ...rest.style,
//         strokeLinejoin: "round",
//       },
//     };

//     return <rect {...adjustedRest}>{children}</rect>;
//   }
//   return <Rect {...rest}>{children}</Rect>;
// };

// export const CustomSVG: FC<PropsSVG> = ({ children, ...rest }) => {
//   if (isHtml) {
//     const style = {
//       left: 0,
//       right: 0,
//       ...rest.style,
//     };
//     return (
//       <svg
//         {...rest}
//         style={{
//           ...(style as { [key: string]: string | number }),
//         }}
//       >
//         {children}
//       </svg>
//     );
//   }
//   return <Svg {...rest}>{children}</Svg>;
// };

// export const CustomDefs: FC<PropsDefs> = ({ children, ...rest }) => {
//   if (isHtml) {
//     return <defs {...rest}>{children}</defs>;
//   }
//   return <Defs {...rest}>{children}</Defs>;
// };

// export const CustomLine: FC<PropsLine> = ({ children, ...rest }) => {
//   if (isHtml) {
//     let adjustedRest: React.SVGProps<SVGLineElement> & {
//       style?: CSSProperties;
//     } = {
//       ...rest,
//       strokeLinejoin: "round",
//       style: {
//         ...rest.style,
//         strokeLinejoin: "round",
//       },
//     };
//     return <line {...adjustedRest}>{children}</line>;
//   }
//   return <Line {...rest}>{children}</Line>;
// };

// export const CustomStop: FC<PropsStop> = ({ children, ...rest }) => {
//   if (isHtml) {
//     return <stop {...rest}>{children}</stop>;
//   }
//   return <Stop {...rest}>{children}</Stop>;
// };

// export const CustomLinearGradient: FC<PropsLinearGradient> = ({
//   children,
//   ...rest
// }) => {
//   if (isHtml) {
//     return <linearGradient {...rest}>{children}</linearGradient>;
//   }
//   return <LinearGradient {...rest}>{children}</LinearGradient>;
// };

// export const CustomDocument: FC<PropsDocument> = ({ children, ...rest }) => {
//   if (isHtml) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           position: "relative",
//           isolation: "isolate",
//           left: 0,
//           right: 0,
//           minHeight: "100%",
//         }}
//       >
//         {children}
//       </div>
//     );
//   }
//   return <Document {...rest}>{children}</Document>;
// };
