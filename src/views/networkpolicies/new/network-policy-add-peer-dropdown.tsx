import {
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  MenuToggleElement,
} from '@patternfly/react-core';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import * as React from 'react';

export type NetworkPolicyPeerType = 'sameNS' | 'anyNS' | 'ipBlock';

export const NetworkPolicyAddPeerDropdown: React.FunctionComponent<
  NetworkPolicyAddPeerDropdownProps
> = (props) => {
  const { t } = useNetworkingTranslation();
  const { title, onSelect } = props;

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <div className="form-group co-create-networkpolicy__add-peer">
      <Dropdown
        onSelect={(event, networkType: NetworkPolicyPeerType) => {
          onSelect(networkType);
          setIsDropdownOpen(false);
        }}
        data-test="add-peer"
        toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
          <MenuToggle
            id="toggle-basic"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            isExpanded={isDropdownOpen}
            ref={toggleRef}
          >
            {title}
          </MenuToggle>
        )}
        isOpen={isDropdownOpen}
      >
        <DropdownList className="add-peer-dropdown">
          <DropdownItem value="sameNS">
            {t('Allow pods from the same namespace')}
          </DropdownItem>
          <DropdownItem value="anyNS">
            {t('Allow pods from inside the cluster')}
          </DropdownItem>
          <DropdownItem value="ipblock">
            {t('Allow peers by IP block')}
          </DropdownItem>
        </DropdownList>
      </Dropdown>
    </div>
  );
};

type NetworkPolicyAddPeerDropdownProps = {
  title: string;
  onSelect: (type: NetworkPolicyPeerType) => void;
};