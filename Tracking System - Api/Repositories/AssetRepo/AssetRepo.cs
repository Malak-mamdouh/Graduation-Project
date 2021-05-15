using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
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
        public async Task<Asset> addAsset(Asset asset)
        {
            if (asset != null)
            {
                await context.assets.AddAsync(asset);
                await context.SaveChangesAsync();
                return asset;
            }
            return null;
        }
        public async Task<IEnumerable<string>> SelectAssetNumberAsync()
        {
            return await context.assets.Select(i => i.AssetNumber).ToListAsync();
        }
        public async Task<bool> deleteAsset(int id)
        {
            var asset = await context.assets.FirstOrDefaultAsync(x => x.Id == id);
            if (asset == null)
                return false;
            if (asset.Url != "")
            {
                FileInfo file = new FileInfo(asset.Url);
                if (file.Exists)
                    file.Delete();
            }
            

            context.assets.Remove(asset);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<Asset> showAsset(int id)
        {
            if (id  != 0)
            {
                var asset = await context.assets.FirstOrDefaultAsync(x => x.Id == id);
                return asset;
            }
            return null; 
        }

        public async Task<IList<Asset>> showAllAssets()
        {
            var assets = await context.assets.ToListAsync();
            return assets;
        }

        public async Task<Asset> updateAsset(Asset asset)
        {
            if (asset.Id != 0)
            {
                var assetModel = await context.assets.FirstOrDefaultAsync(a => a.Id == asset.Id);
                if (assetModel == null)
                    return null;
                context.assets.Attach(assetModel);
                assetModel.Name = asset.Name;
                assetModel.Type = asset.Type;
                assetModel.SubType = asset.SubType;
                assetModel.Description = asset.Description;
                assetModel.AssetNumber = asset.AssetNumber;
                assetModel.Url = asset.Url;
                context.Entry(assetModel).Property(a => a.Name).IsModified = true;
                context.Entry(assetModel).Property(a => a.Type).IsModified = true;
                context.Entry(assetModel).Property(a => a.SubType).IsModified = true;
                context.Entry(assetModel).Property(a => a.AssetNumber).IsModified = true;
                context.Entry(assetModel).Property(a => a.Description).IsModified = true;
                context.Entry(assetModel).Property(a => a.Url).IsModified = true;

                await context.SaveChangesAsync();
                return assetModel;
            }
            return null;
        }
    }
}
