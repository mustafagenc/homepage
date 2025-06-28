import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

function CustomLink({ projectName, ...props }: any) {
    const href = String(props?.href);
    if (href.startsWith('#')) {
        return (
            <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                href={`https://github.com/mustafagenc/${projectName}/${href}`}
                className="underline underline-offset-4"
            />
        );
    }
    return <a {...props} target="_blank" rel="noopener noreferrer" className="inline-block" />;
}

interface MDXContentProps {
    source: string;
    projectName?: string;
}

export default function MDXContent({ source, projectName }: MDXContentProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                a: (props) => <CustomLink projectName={projectName} {...props} />,
            }}
        >
            {source}
        </ReactMarkdown>
    );
}
