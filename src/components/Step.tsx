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
    <div className="tw-flex tw-flex-col tw-flex-1 tw-justify-center tw-max-w-full tw-w-[800px] tw-mx-auto tw-text-center">
      {data.image && <img className="tw-w-[240px] tw-mx-auto" src={data.image} alt="" />}
      {data.originalTitle && (
        <h4 className="tw-text-xs sm:tw-text-sm tw-block tw-mb-2 tw-text-neutral-400">
          {data.originalTitle}
        </h4>
      )}
      <HighlightedText
        element="h2"
        className="tw-text-3xl tw-text-neutral-50 tw-font-bold"
        text={formatMessage({ id: data.title })}
        attrs={{
          className: 'tw-px-2 tw-py-1 tw-bg-neutral-700 tw-rounded-md tw-mx-1',
        }}
      />
      <HighlightedText
        element="p"
        className="tw-text-neutral-300 tw-mt-4 tw-tracking-wide"
        text={formatMessage({ id: data.description })}
        attrs={{
          className:
            'tw-p-1 tw-text-xs tw-whitespace-nowrap tw-rounded-md tw-bg-neutral-700 tw-tracking-widest',
        }}
      />
      {lessonData.length === step + 1 && <ProductButton onlyBuyMeACoffee />}
      <InteractiveArea key={step} isShow={isInteractive} setIsOpenModal={setIsOpenModal} />
      <a
        className="tw-text-xs tw-inline-flex tw-items-center tw-justify-end tw-text-neutral-400 hover:tw-text-neutral-300 tw-relative tw-bottom-3 tw-ml-auto"
        href={lesson.sponsorURL || 'https://github.com/aykutkardas/regexlearn.com#sponsoring'}
        target="_blank"
        rel="noreferrer"
      >
        {lesson.sponsor ? (
          <span className="tw-inline-flex tw-items-center">
            Sponsored by{' '}
            <img className="tw-mx-2 tw-h-3" src={lesson.sponsorLogo} alt={lesson.sponsor} />
          </span>
        ) : (
          <span>Become a Sponsor</span>
        )}
      </a>
      {data.videoURL && modalIsOpen && (
        <div className="tw-fixed tw-flex tw-flex-col tw-items-center tw-justify-center tw-z-50 tw-inset-0 tw-bg-neutral-900/70">
          <iframe
            width="90%"
            height="90%"
            src={data.videoURL}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <Button
            className="tw-bg-green-700 hover:tw-bg-green-800 tw-mt-2"
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
