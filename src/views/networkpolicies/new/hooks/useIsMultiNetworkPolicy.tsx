import { useLocation } from 'react-router-dom-v5-compat';

import { MultiNetworkPolicyModel } from '@utils/models';
import { isEmpty } from '@utils/utils';

const useIsMultiNetworkPolicy = () => {
  const location = useLocation();

  return !isEmpty(location.pathname.match(MultiNetworkPolicyModel.kind));
};

export default useIsMultiNetworkPolicy;
