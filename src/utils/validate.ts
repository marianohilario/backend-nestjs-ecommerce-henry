export function validateUserData(user: any, isNew: boolean = false): boolean {
  const requiredFields = ['email', 'name', 'password', 'address', 'phone'];
  const optionalFields = ['country', 'city'];

  if (isNew) {
    for (const field of requiredFields) {
      if (
        (field === 'phone' && typeof user[field] !== 'number') ||
        (field !== 'phone' && typeof user[field] !== 'string')
      ) {
        return false;
      }
    }
  } else {
    for (const field of requiredFields) {
      if (
        (field === 'phone' &&
          user[field] !== undefined &&
          typeof user[field] !== 'number') ||
        (field !== 'phone' &&
          user[field] !== undefined &&
          typeof user[field] !== 'string')
      ) {
        return false;
      }
    }
  }

  for (const field of optionalFields) {
    if (user[field] !== undefined && typeof user[field] !== 'string') {
      return false;
    }
  }

  return true;
}

export function validateProductData(
  product: any,
  isNew: boolean = false,
): boolean {
  const fieldTypes: { [key: string]: string } = {
    name: 'string',
    description: 'string',
    imgUrl: 'string',
    price: 'number',
    stock: 'number',
  };

  for (const [field, type] of Object.entries(fieldTypes)) {
    if (isNew) {
      if (typeof product[field] !== type) {
        return false;
      }
    } else {
      if (product[field] !== undefined && typeof product[field] !== type) {
        return false;
      }
    }
  }

  return true;
}
