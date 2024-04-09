import { SortSelectorItem } from '../../atoms';
import { SortTypes } from '../../../constants';
import { SortTypesType } from '../../../types';
import { useBooleanHelpers } from '../../../hooks';

type SortSelectorProps = {
  selectedSort: SortTypesType;
  onSelect: (sort: SortTypesType) => void;
};

function SortSelector({selectedSort, onSelect}: SortSelectorProps) {
  const {isOn: isOpened, off, toggle} = useBooleanHelpers(false);

  const handleSort = (sort: SortTypesType) => {
    onSelect(sort);
    off();
  };

  return (
    <form className="places__sorting" action="#">
      <span className="places__sorting-caption">Sort by</span>
      &nbsp;
      <span className="places__sorting-type" tabIndex={0} onClick={toggle}>
        { selectedSort }
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {
        isOpened && (
          <ul className="places__options places__options--custom places__options--opened">
            {
              Object.values(SortTypes).map((type) => (
                <SortSelectorItem key={type} isSelected={type === selectedSort} value={type} onClick={handleSort}/>
              ))
            }
          </ul>
        )
      }
    </form>
  );
}

export default SortSelector;
