using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.AssetRepo
{
    public interface IAssetRepo
    {
        Task<Asset> addAsset(Asset asset);
        Task<bool> deleteAsset(int id);
        Task<IList<Asset>> showAllAssets();
        Task<Asset> showAsset(int id);
        Task<Asset> updateAsset(Asset asset);
        Task<IEnumerable<string>> SelectAssetNumberAsync();

    }
}
