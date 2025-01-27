import { useAuthorAndSiteInfo } from 'hooks/useAuthorAndSiteInfo';
import { useRef, useEffect, useState, memo } from 'react';
import Placeholder from '../Placeholder';

export function CommentsThread(): JSX.Element {
  const { site: { githubCommentsRepository } } = useAuthorAndSiteInfo();

  const commentBox = useRef<HTMLDivElement>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const scriptEl = document.createElement('script');
    scriptEl.async = true;
    scriptEl.src = 'https://utteranc.es/client.js';
    scriptEl.setAttribute('repo', githubCommentsRepository);
    scriptEl.setAttribute('issue-term', 'pathname');
    scriptEl.setAttribute('id', 'utterances');
    scriptEl.setAttribute('theme', 'github-light');
    scriptEl.setAttribute('crossorigin', 'anonymous');

    if (commentBox && commentBox.current) {
      setIsLoading(true);
      commentBox.current.appendChild(scriptEl);

      scriptEl.addEventListener('load', () => {
        const iframe = document.querySelector('.utterances-frame');
        iframe.addEventListener('load', () => setIsLoading(false));
      });
    } else {
      console.log(`Error adding utterances comments on: ${commentBox}`);
    }
  }, []);

  return (
    <>
      {isLoading ? <Placeholder /> : null}
      <div ref={commentBox}></div>
    </>
  );
}

export default memo(CommentsThread);
