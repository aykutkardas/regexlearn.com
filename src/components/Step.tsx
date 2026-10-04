import { createPortal } from 'react-dom';
import { useState, useEffect, useContext } from 'react';
import { useIntl } from 'react-intl';
import dynamic from 'next/dynamic';
import useEventListener from '@use-it/event-listener';

import InteractiveArea from 'src/components/InteractiveArea';
import HighlightedText from 'src/components/HighlightedText';
import Progress from 'src/components/Progress';
import Button, { ButtonVariants } from 'src/components/Button';
import { InteractiveAreaContext } from 'src/context/InteractiveAreaContext';

const ReportStep = dynamic(import('src/components/ReportStep'), { ssr: false });

const Step = () => {
  const { lesson, data, lessonData, step } = useContext(InteractiveAreaContext);

  const [mounted, setMounted] = useState(false);
  const [modalIsOpen, setIsOpenModal] = useState(false);
  const { formatMessage } = useIntl();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCloseModal = event => {
    if (event.key === 'Escape') {
      setIsOpenModal(false);
    }
  };

  useEventListener('keyup', handleCloseModal);

  const isInteractive = data.interactive !== false;

  return (
    <div className="flex flex-col flex-1 justify-center max-w-full w-[760px] mx-auto py-6">
      <div key={`title-${step}`} className="flex flex-col text-center mx-auto animate-fade-up">
        {data.image && <img className="w-[240px] mx-auto" src={data.image} alt="" />}
        {data.originalTitle && (
          <h4 className="text-xs sm:text-sm block mb-3 font-mono text-regreen-400/70 tracking-wide">
            {data.originalTitle}
          </h4>
        )}
        <HighlightedText
          element="h2"
          className="text-3xl sm:text-4xl text-white font-bold tracking-tight leading-snug"
          text={formatMessage({ id: data.title })}
          attrs={{
            className:
              'font-mono text-[0.8em] px-2 py-0.5 mx-1 rounded-lg bg-white/[0.06] border border-white/[0.08] text-regreen-400 whitespace-nowrap',
            dir: 'ltr',
          }}
        />
        <HighlightedText
          element="p"
          className="text-neutral-300/90 mt-5 leading-relaxed text-[15px] max-w-2xl mx-auto"
          text={formatMessage({ id: data.description })}
          attrs={{
            className: 'code-chip',
            dir: 'ltr',
          }}
        />
      </div>

      {lessonData.length === step + 1 && (
        <div className="mx-auto mt-6 hover:scale-105 transition">
          <a href="https://www.buymeacoffee.com/aykutkardas" target="_blank" rel="noreferrer">
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              style={{ height: 50, width: 217 }}
            />
          </a>
        </div>
      )}

      <InteractiveArea key={step} isShow={isInteractive} setIsOpenModal={setIsOpenModal} />

      <div className="flex items-center justify-between gap-4 mt-3 min-h-[24px]">
        {isInteractive ? <ReportStep title={data.title} step={step} /> : <span />}
        <a
          className="text-xs inline-flex items-center text-neutral-500 hover:text-neutral-200 transition-colors"
          href={lesson.creatorURL || 'https://github.com/aykutkardas/regexlearn.com#sponsoring'}
          target="_blank"
          rel="noreferrer"
        >
          {lesson.creator ? (
            <span dir="ltr" className="flex items-center">
              {lesson.sponsor ? 'Sponsored' : 'Created'} by{' '}
              <img
                className="mx-1"
                style={{ height: lesson.logoHeight || 12 }}
                src={lesson.sponsorLogo || lesson.creatorLogo}
                alt={lesson.creator}
              />
            </span>
          ) : (
            <span>Become a Sponsor</span>
          )}
        </a>
      </div>
      {data.videoURL && modalIsOpen && (
        <div
          className="fixed flex flex-col items-center justify-center gap-4 z-50 inset-0 p-4 sm:p-10 bg-ink-950/80 backdrop-blur-md animate-fade-up"
          onClick={() => setIsOpenModal(false)}
        >
          <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
            <iframe
              title={`${lesson.title} video`}
              width="100%"
              height="100%"
              src={data.videoURL}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-presentation"
              allowFullScreen
            />
          </div>
          <Button variant={ButtonVariants.Secondary} onClick={() => setIsOpenModal(false)}>
            Close
            <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-white/10 text-neutral-400">
              Esc
            </kbd>
          </Button>
        </div>
      )}
      {mounted &&
        createPortal(
          <Progress total={lessonData.length} current={step + 1} />,
          window.document.getElementById('ProgressArea'),
        )}
    </div>
  );
};

export default Step;
