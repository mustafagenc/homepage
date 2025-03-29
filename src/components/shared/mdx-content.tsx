import { highlight } from 'sugar-high';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      className="inline-block"
    />
  );
}

interface MDXContentProps {
  source: string;
  projectName?: string;
}

export default function MDXContent({ source, projectName }: MDXContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: Code,
        a: (props) => <CustomLink projectName={projectName} {...props} />,
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
