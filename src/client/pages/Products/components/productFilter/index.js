import React, {useCallback, useState, useEffect} from 'react';
import {Avatar, TextStyle, Card, TextField, ChoiceList, Filters, RangeSlider, ResourceList} from '@shopify/polaris';

export default function ProductFilter(props) {
  const [accountStatus, setAccountStatus] = useState(null);
  const [moneySpent, setMoneySpent] = useState(null);
  const [taggedWith, setTaggedWith] = useState(null);
  const [queryValue, setQueryValue] = useState(null);

  const [queryObj, setQueryObj] = useState({
    queryTitle: null,
    queryVendor: null,
  })

  useEffect(() => {
    props.queryObj(queryObj);
  },[queryObj])

  const handleAccountStatusChange = (value) => {
    setQueryObj({
      ...queryObj,
      queryVendor:value
    });
  }
  // handle query Title
  const handleFiltersQueryChange = (value) => {
    setQueryObj({
      ...queryObj,
      queryTitle: value
    })
  }
  const handleMoneySpentChange = useCallback(
    (value) => setMoneySpent(value),
    [],
  );
  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  
  const handleMoneySpentRemove = useCallback(() => setMoneySpent(null), []);
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = () => {
    setQueryObj({
      ...queryObj,
      queryTitle: null
    });
  };
  const handleAccountStatusRemove = () => {
    setQueryObj({
      ...queryObj,
      queryVendor: null
    });
  }
  const handleFiltersClearAll = () => {
    handleQueryValueRemove();
    handleAccountStatusRemove();
  };

  const filters = [
    {
      key: 'accountStatus',
      label: 'Account status',
      filter: (
        <ChoiceList
          title="Vendor filters"
          titleHidden
          choices={[
            {label: 'Arena Flinto', value:'Arena Flinto'},
            {label: 'Armani', value:'Armani'},
            {label: 'Bosco',value:'Bosco'},
            {label: 'Bulgari',value:'Bulgari'},
            {label: 'Burton', value:'Burton'},
          ]}
          selected={queryObj.queryVendor || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: 'moneySpent',
      label: 'Money spent',
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleMoneySpentChange}
        />
      ),
    },
  ];

  const appliedFilters = [];
  if (!isEmpty(accountStatus)) {
    const key = 'accountStatus';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, accountStatus),
      onRemove: handleAccountStatusRemove,
    });
  }
  if (!isEmpty(moneySpent)) {
    const key = 'moneySpent';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, moneySpent),
      onRemove: handleMoneySpentRemove,
    });
  }
  if (!isEmpty(taggedWith)) {
    const key = 'taggedWith';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, taggedWith),
      onRemove: handleTaggedWithRemove,
    });
  }

  return (
    <Filters
      queryValue={queryObj.queryTitle}
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={handleFiltersQueryChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleFiltersClearAll}
    />
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'moneySpent':
        return `Money spent is between $${value[0]} and $${value[1]}`;
      case 'taggedWith':
        return `Tagged with ${value}`;
      case 'accountStatus':
        return value.map((val) => `Customer ${val}`).join(', ');
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}

