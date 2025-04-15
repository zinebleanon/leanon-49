
const getCapitalizedFirstName = () => {
  if (!userInfo) {
    console.log('No userInfo available');
    return '';
  }
  
  // Log out the entire userInfo to see what's available
  console.log('UserInfo:', JSON.stringify(userInfo, null, 2));
  
  const firstName = userInfo.firstName || (userInfo.name ? userInfo.name.split(' ')[0] : '');
  const lastName = userInfo.lastName || (userInfo.name ? userInfo.name.split(' ')[1] : '');
  
  const formattedName = lastName 
    ? `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(lastName[0])}`.trim()
    : capitalizeFirstLetter(firstName);
  
  console.log('Formatted Name:', formattedName);
  
  return formattedName;
};
