import { createPortal } from 'react-dom';
import { useState, useEffect, useContext } from 'react';
import { useIntl } from 'react-intl';
import useEventListener from '@use-it/event-listener';

import InteractiveArea from 'src/components/InteractiveArea';
import HighlightedText from 'src/components/HighlightedText';
import Progress from 'src/components/Progress';
import Button from 'src/components/Button';
import ProductButton from 'src/components/ProductButton';
import { InteractiveAreaContext } from 'src/context/InteractiveAreaContext';

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
    <div className="flex flex-col flex-1 justify-center max-w-full w-[800px] mx-auto px-3">
      <div className="flex flex-col text-center mx-auto">
        {data.image && <img className="w-[240px] mx-auto" src={data.image} alt="" />}
        {data.originalTitle && (
          <h4 className="text-xs sm:text-sm block mb-2 text-neutral-400">{data.originalTitle}</h4>
        )}
        <HighlightedText
          element="h2"
          className="text-3xl text-neutral-50 font-bold"
          text={formatMessage({ id: data.title })}
          attrs={{
            className: 'px-2 py-1 bg-neutral-700 rounded-md mx-1',
          }}
        />
        <HighlightedText
          element="p"
          className="text-neutral-300 mt-4 tracking-wide"
          text={formatMessage({ id: data.description })}
          attrs={{
            className: 'p-1 text-xs whitespace-nowrap rounded-md bg-neutral-700 tracking-widest',
          }}
        />
      </div>

      {lessonData.length === step + 1 && <ProductButton onlyBuyMeACoffee />}
      <InteractiveArea key={step} isShow={isInteractive} setIsOpenModal={setIsOpenModal} />
      <a
        className="text-xs inline-flex items-center justify-end text-neutral-400 hover:text-neutral-300 relative bottom-3 ml-auto"
        href={lesson.sponsorURL || 'https://github.com/aykutkardas/regexlearn.com#sponsoring'}
        target="_blank"
        rel="noreferrer"
      >
        {lesson.sponsor ? (
          <span className="inline-flex items-center">
            Sponsored by <img className="mx-2 h-3" src={lesson.sponsorLogo} alt={lesson.sponsor} />
          </span>
        ) : (
          <span>Become a Sponsor</span>
        )}
      </a>
      {data.videoURL && modalIsOpen && (
        <div className="fixed flex flex-col items-center justify-center z-50 inset-0 bg-neutral-900/70">
          <iframe
            width="90%"
            height="90%"
            src={data.videoURL}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <Button
            className="bg-green-700 hover:bg-green-800 mt-2"
            onClick={() => setIsOpenModal(false)}
          >
            Close
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
