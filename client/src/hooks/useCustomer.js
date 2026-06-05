import { useEffect, useState } from "react";

//state variable to store and update customer data in the front end
export const useCustomer = (initialCustomer = null) => {
  const [customer, setCustomer] = useState(initialCustomer);

  const updateField = (field, value) => {
    setCustomer((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateCustomer = (data) => {
    setCustomer(data);
  };

  return { customer, setCustomer, updateField, updateCustomer };
};

//state variable to store and load multiple customers data in the front end
export const useCustomers = (fetchCustomers) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const loadCustomers = async () => {
      const data = await fetchCustomers();
      if (data) {
        console.log(data);
        setCustomers(data);
      }
    };
    loadCustomers();
  }, [fetchCustomers]);
  return { customers, setCustomers };
};
