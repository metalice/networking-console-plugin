import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom-v5-compat';

import { modelToGroupVersionKind } from '@kubevirt-ui/kubevirt-api/console/modelUtils';
import { useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';
import { QuickStart } from '@patternfly/quickstarts';
import {
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateFooter,
  EmptyStateHeader,
} from '@patternfly/react-core';
import { RocketIcon } from '@patternfly/react-icons/dist/esm/icons/rocket-icon';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import { QuickStartModel } from '@utils/models';

import NADCreateDropdown from '../NADCreateDropdown/NADCreateDropdown';

type NADListEmptyProps = {
  namespace: string;
};

const NADListEmpty: FC<NADListEmptyProps> = ({ namespace }) => {
  const navigate = useNavigate();
  const { t } = useNetworkingTranslation();

  const searchText = 'network attachment definition';
  const [quickStarts, quickStartsLoaded] = useK8sWatchResource<QuickStart[]>({
    groupVersionKind: modelToGroupVersionKind(QuickStartModel),
    isList: true,
  });
  const hasQuickStarts =
    quickStartsLoaded &&
    quickStarts.find(
      ({ spec: { description, displayName } }) =>
        displayName.toLowerCase().includes(searchText) ||
        description.toLowerCase().includes(searchText),
    );

  return (
    <EmptyState>
      <EmptyStateHeader headingLevel="h4" titleText={t('No NetworkAttachmentDefinition found')} />
      <EmptyStateFooter>
        <NADCreateDropdown namespace={namespace} />
        {hasQuickStarts && (
          <EmptyStateActions>
            <Button
              data-test-id="nad-quickstart"
              onClick={() => navigate('/quickstart?keyword=network+attachment+definition')}
              variant="secondary"
            >
              <RocketIcon />
              {t('Learn how to use NetworkAttachmentDefinitions')}
            </Button>
          </EmptyStateActions>
        )}
      </EmptyStateFooter>
    </EmptyState>
  );
};

export default NADListEmpty;
