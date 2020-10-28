import { useState, useEffect, useCallback } from 'react';

import { moviesApiCall } from '../services/api';

function useAutocompleteState() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async (query) => {
    try {
      setLoading(true);
      const data = await moviesApiCall(query);
      setLoading(false);
      return data;
    } catch (error) {
      console.error('Something went wrong: from (useAutocomplete hook)', error.message)
    }
  }, []);

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    (async () => {
      const results = await fetch(inputValue);
      if (!results) return;
      else {
        if (active) {
          let newOptions = [];

          if (value) {
            newOptions = [value];
          }
          if (results.Response !== "False" && !results.Search) {
            newOptions = [...newOptions, results];
          }
          if (results.Search) {
            newOptions = [...newOptions, ...results.Search];
          }
          setOptions(newOptions);
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch, open]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
      setError('')
    }
  }, [open]);

  return {
    value,
    inputValue,
    open,
    error,
    options,
    loading,
    setValue,
    setError,
    handleOpen: () => {
      if (inputValue.length > 1) {
        setLoading(true);
      }
      setOpen(true);
    },
    handleClose: () => {
      setLoading(false);
      setOpen(false);
    },
    handleChange: (event, newValue) => {
      setOptions(options);
      setValue(newValue);
    },
    handleInputChange: (event, newInputValue) => {
      setError('');
      setInputValue(newInputValue);
    }
  }
}

export default useAutocompleteState;