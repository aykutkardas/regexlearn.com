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
import styles from './Step.module.css';

const Step = () => {
  const { lesson, data, step } = useContext(InteractiveAreaContext);
  const stepData = data[step];

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

  const isInteractive = stepData.interactive !== false;

  return (
    <div className={styles.Step}>
      {stepData.image && (
        <img className={styles.StepImage} src={stepData.image} alt="" width={100} />
      )}
      {stepData.originalTitle && (
        <h4 className={styles.StepTitleOriginal}>{stepData.originalTitle}</h4>
      )}
      <HighlightedText
        element="h2"
        className={styles.StepTitle}
        text={formatMessage({ id: stepData.title })}
        attrs={{ className: styles.StepTitleWord }}
      />
      <HighlightedText
        element="p"
        className={styles.StepDescription}
        text={formatMessage({ id: stepData.description })}
        attrs={{ className: styles.StepDescriptionWord }}
      />
      {data.length === step + 1 && <ProductButton onlyBuyMeACoffee />}
      <InteractiveArea key={step} isShow={isInteractive} setIsOpenModal={setIsOpenModal} />
      {lesson.sponsor ? (
        <span className={styles.LessonSponsor}>
          Sponsored by{' '}
          <a href={lesson.sponsorURL} target="_blank" rel="noreferrer">
            <img src={lesson.sponsorLogo} alt={lesson.sponsor} />
          </a>
        </span>
      ) : (
        <a
          target="_blank"
          className={styles.LessonSponsor}
          rel="noreferrer"
          href="https://github.com/aykutkardas/regexlearn.com#sponsoring"
        >
          Become a Sponsor
        </a>
      )}
      {stepData.videoURL && modalIsOpen && (
        <div className={styles.StepVideoModal}>
          <iframe
            width="90%"
            height="90%"
            src={stepData.videoURL}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <Button onClick={() => setIsOpenModal(false)}>Close</Button>
        </div>
      )}
      {mounted &&
        createPortal(
          <Progress total={data.length} current={step + 1} />,
          window.document.getElementById('ProgressArea'),
        )}
    </div>
  );
};

export default Step;
