import React, { ReactNode } from 'react';
import { Trans } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom-v5-compat';

import { K8sResourceCommon, ListPageHeader } from '@openshift-console/dynamic-plugin-sdk';
import {
  Button,
  ButtonVariant,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateIcon,
} from '@patternfly/react-core';
import { AddCircleOIcon } from '@patternfly/react-icons';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import { isEmpty } from '@utils/utils';

import ExternalLink from '../ExternalLink/ExternalLink';

import ListErrorState from './ListErrorState';
import ListSkeleton from './ListSkeleton';

type ListEmptyStateProps<T> = {
  children: ReactNode;
  createButtonlink: string;
  data: T[];
  error: any;
  kind: string;
  learnMoreLink: string;
  loaded: boolean;
  title: string;
};

const ListEmptyState = <T extends K8sResourceCommon>({
  children,
  createButtonlink,
  data,
  error,
  kind,
  learnMoreLink,
  loaded,
  title,
}: ListEmptyStateProps<T>) => {
  const { t } = useNetworkingTranslation();
  const navigate = useNavigate();
  const params = useParams();

  if (error) return <ListErrorState error={error} title={title} />;

  if (!loaded)
    return (
      <>
        <ListPageHeader title={title} />
        <ListSkeleton />
      </>
    );

  if (isEmpty(data))
    return (
      <>
        <ListPageHeader title={title} />
        <EmptyState>
          <EmptyStateHeader
            headingLevel="h4"
            icon={<EmptyStateIcon icon={AddCircleOIcon} />}
            titleText={t('No {{kind}} found', { kind })}
          />
          <EmptyStateBody>
            <Trans t={t}>
              Click <b>Create {{ kind }}</b> to create your first {{ kind }}
            </Trans>
          </EmptyStateBody>
          <EmptyStateFooter>
            <EmptyStateActions>
              <Button
                onClick={() =>
                  navigate(
                    params?.ns
                      ? createButtonlink
                      : `/k8s/ns/default/${params.plural}/${createButtonlink}`,
                  )
                }
                variant={ButtonVariant.primary}
              >
                {t('Create {{ kind }}', { kind })}
              </Button>
            </EmptyStateActions>
            <EmptyStateActions>
              <ExternalLink href={learnMoreLink}>
                {t('Learn more about {{ kind }}', { kind })}
              </ExternalLink>
            </EmptyStateActions>
          </EmptyStateFooter>
        </EmptyState>
      </>
    );

  return <>{children}</>;
};

export default ListEmptyState;
