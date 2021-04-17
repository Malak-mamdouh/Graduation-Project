using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.AssetRepo
{
    public class AssetRepo : IAssetRepo
    {
        private readonly Context context;

        public AssetRepo( Context context)
        {
            this.context = context;
        }
        public async Task addAsset(Asset asset)
        {
            await context.assets.AddAsync(asset);
            await context.SaveChangesAsync();
        }

        public async Task deleteAsset(int id)
        {
            var asset = await context.assets.FirstOrDefaultAsync(x => x.Id == id);
             context.assets.Remove(asset);
            await context.SaveChangesAsync();
        }

        public async Task<Asset> showAsset(int id)
        {
            var asset = await context.assets.FirstOrDefaultAsync(x => x.Id == id);

            return asset;
        }

        public async Task<IList<Asset>> showAssets()
        {
            var assets = await context.assets.ToListAsync();
            return assets;
        }

        public async Task<Asset> updateAsset(Asset asset, int id)
        {
            if (id == asset.Id)
            {
                context.Entry(asset).State = EntityState.Modified;
               await context.SaveChangesAsync();
                return asset;
            }
            else return null;
        }
    }
}
