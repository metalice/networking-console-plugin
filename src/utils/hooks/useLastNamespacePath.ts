import { useActiveNamespace } from '@openshift-console/dynamic-plugin-sdk';
import { useLastNamespace } from '@openshift-console/dynamic-plugin-sdk-internal';
import { ALL_NAMESPACES, ALL_NAMESPACES_KEY } from '@utils/constants';

type UseActiveNamespacePathType = () => string;

export const buildNSPath = (namespace: string): string =>
  [ALL_NAMESPACES, ALL_NAMESPACES_KEY].includes(namespace) ? ALL_NAMESPACES : `ns/${namespace}`;

export const useLastNamespacePath: UseActiveNamespacePathType = () => {
  const [lastNamespace] = useLastNamespace();
  const [activeNamespace] = useActiveNamespace();

  return !lastNamespace ? buildNSPath(activeNamespace) : buildNSPath(lastNamespace);
};
