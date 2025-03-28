import Image from 'next/image';
import { highlight } from 'sugar-high';
import ReactMarkdown from 'react-markdown';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Code({ children, ...props }: any) {
  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomLink({ projectName, ...props }: any) {
  const href = String(props?.href);
  if (href.startsWith('#')) {
    return (
      <a
        {...props}
        target="_blank"
        href={`https://github.com/mustafagenc/${projectName}/${href}`}
        className="underline underline-offset-4"
      />
    );
  }
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-4"
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomImage({ ...props }: any) {
  const imageSrc = String(props?.src);

  // If the image src is invalid i.e. starts with .
  // Next Image consideres any image path invlid if it starts with .
  // Relative paths need to start with / or http(s):
  if (imageSrc.startsWith('.'))
    // Cannot return a block level element like div or p inside as it would result in a hydration error.
    return (
      <span className="my-2 flex justify-center bg-zinc-50 p-10 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
        <strong>404</strong>: Oops, image not found!
      </span>
    );

  // Don't render badges.
  if (imageSrc.includes('img.shields.io')) return null;

  return (
    <div className="my-2 flex justify-center">
      <Image
        {...props}
        alt={props.alt || 'Image'}
        width={750}
        height={380}
        className="rounded-md object-cover"
        priority
      />
    </div>
  );
}

interface MDXContentProps {
  source: string;
  projectName?: string;
}

export default function MDXContent({ source, projectName }: MDXContentProps) {
  return (
    <ReactMarkdown
      components={{
        code: Code,
        a: (props) => <CustomLink projectName={projectName} {...props} />,
        img: CustomImage,
        p: ({ children }) => <p className="mb-4">{children}</p>,
        h1: ({ children }) => (
          <h1 className="mt-8 mb-4 text-2xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-8 mb-4 text-xl font-bold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 mb-4 text-lg font-bold">{children}</h3>
        ),
        ul: ({ children }) => (
          <ul className="mb-4 list-disc pl-6">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal pl-6">{children}</ol>
        ),
        li: ({ children }) => <li className="mb-2">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="mb-4 border-l-4 border-gray-300 pl-4 italic">
            {children}
          </blockquote>
        ),
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
