export const usePathValidation = (path: string, matcher: RegExp) => {
  const validatePath = () => {
    

    if (!path || !matcher.test(path)) {
      return false;
    }

    return true;
  };

  return { validatePath };
};
