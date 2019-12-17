import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import uuid4 from 'uuid/v4';

import {openModal, closeModal} from 'actions/modal';
import {ModalTypes, Todo} from 'src/types';
import {DEFAULT_REMIND_INTERVAL_IN_MINUTES} from 'src/constants';
import RemindDropdownModal from 'components/Modals/RemindDropdownModal';

const useSetRemindDropdown = (
  todo: Todo = null,
): [number, boolean, () => void] => {
  const key = useRef(uuid4());
  const dispatch = useDispatch();

  const [remindIntervalInMinutes, setRemindIntervalInMinutes] = useState<
    number
  >(todo?.remindIntervalInMinutes || DEFAULT_REMIND_INTERVAL_IN_MINUTES);
  const [remindEnabled, enableRemind] = useState(todo?.remindEnabled);

  function changeRemindInterval(value: number) {
    setRemindIntervalInMinutes(value);
  }
  function openRemindDropdownModal() {
    dispatch(
      openModal({
        key: key.current,
        name: ModalTypes.REMIND_DROPDOWN_MODAL,
        component: (
          <RemindDropdownModal
            closeRemindDropdown={closeRemindDropdownModal}
            remindEnabled={remindEnabled}
            enableRemind={enableRemind}
            remindIntervalInMinutes={remindIntervalInMinutes}
            changeRemindInterval={changeRemindInterval}
          />
        ),
      }),
    );
  }
  function closeRemindDropdownModal() {
    dispatch(closeModal(key.current));
  }

  return [remindIntervalInMinutes, remindEnabled, openRemindDropdownModal];
};

export default useSetRemindDropdown;
