import { fetchListItems } from './fetchListItems';

const transformData = async (data) => {
  
  const transformedData = await Promise.all(
    data.map(async (item) => {
      
      // Fetch the items based on list.ids.trakt
      const items = await fetchListItems(item.ids.trakt);
      const first25Items = items.slice(0, 25);

      // Return the transformed object
      return {
        description: item.description,
        id: item.ids.trakt,
        item_count: item.item_count,
        items: first25Items,
        name: item.name,
        saved: false,
        slug: item.ids.slug,
        type: "discovery"
      };
    })
  );

  return transformedData;
};

export { transformData };