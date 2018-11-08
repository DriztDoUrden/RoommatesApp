using Microsoft.Web.Infrastructure.DynamicModuleHelper;
using Ninject;
using Ninject.Web.Common;
using Ninject.Web.Common.WebHost;
using System;
using System.Web;
using FlatAPI.App_Start;
using FlatAPI.Repositories.IRepository;
using FlatAPI.Repositories.Repository;
using FlatAPI.Models;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(NinjectWebCommon), "Stop")]


namespace FlatAPI.App_Start
{
    public static class NinjectWebCommon
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        public static void Start()
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }

        public static void Stop()
        {
            bootstrapper.ShutDown();
        }

        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
            kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

            RegisterServices(kernel);
            return kernel;
        }
        private static void RegisterServices(IKernel kernel)
        {
            //kernel.Bind<IRepo>().ToMethod(ctx => new Repo("Ninject Rocks!"));
            kernel.Bind<ApplicationDbContext>().ToSelf().InRequestScope();
            kernel.Bind<IFlatsRepository>().To<FlatRepository>();
            kernel.Bind<IResidentsRepository>().To<ResidentsRepository>();
            kernel.Bind<IAdvertisementRepository>().To<AdvertisementRepository>();
            kernel.Bind<IRentalFeesRepository>().To<RentalFeesRepository>();
            kernel.Bind<ICleaningRepository>().To<CleaningRepository>();
            kernel.Bind<IChatRepository>().To<ChatRepository>();
            kernel.Bind<IEventsRepository>().To<EventsRepository>();
        }
    }
}