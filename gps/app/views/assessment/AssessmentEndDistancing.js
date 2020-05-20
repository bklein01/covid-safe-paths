import React, { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import image from '../../assets/images/assessment/illustration-screening-end-distancing.png';
import Fonts from '../../constants/fonts';
import { MetaContext } from './AssessmentContext';
import AssessmentEnd from './AssessmentEnd';

/** @type {React.FunctionComponent<{}>} */
const AssessmentEndDistancing = ({ navigation }) => {
  let { t } = useTranslation();
  let { completeRoute } = useContext(MetaContext);
  return (
    <AssessmentEnd
      ctaAction={() => {
        navigation.push(completeRoute);
      }}
      ctaTitle={t('assessment.distancing_cta')}
      description={
        <Trans i18nKey='assessment.distancing_description'>
          <Text />
          <Text style={{ fontFamily: Fonts.primaryBold }} />
        </Trans>
      }
      image={image}
      title={t('assessment.distancing_title')}
    />
  );
};

export default AssessmentEndDistancing;