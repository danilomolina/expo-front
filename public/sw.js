if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(a[r])return;let n={};const d=e=>s(e,r),o={module:{uri:r},exports:n,require:d};a[r]=Promise.all(i.map((e=>o[e]||d(e)))).then((e=>(c(...e),n)))}}define(["./workbox-9b4d2a02"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/1SgFL5WXGAV24mMIJ8xAY/_buildManifest.js",revision:"64d94d2c961842f7d64b379412b97ccf"},{url:"/_next/static/1SgFL5WXGAV24mMIJ8xAY/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/031aa83e-fe0969f6acfaff1d.js",revision:"fe0969f6acfaff1d"},{url:"/_next/static/chunks/1249-080dd78dd9e7a989.js",revision:"080dd78dd9e7a989"},{url:"/_next/static/chunks/2111.d8aafda9984f3627.js",revision:"d8aafda9984f3627"},{url:"/_next/static/chunks/2277-c6148a818ef10c14.js",revision:"c6148a818ef10c14"},{url:"/_next/static/chunks/2745-6448fe46947a0acb.js",revision:"6448fe46947a0acb"},{url:"/_next/static/chunks/2879-03682a476632a5c6.js",revision:"03682a476632a5c6"},{url:"/_next/static/chunks/3089-05a01750eb465c57.js",revision:"05a01750eb465c57"},{url:"/_next/static/chunks/315-3074939e144f32fd.js",revision:"3074939e144f32fd"},{url:"/_next/static/chunks/375-57702906e4b4d5e0.js",revision:"57702906e4b4d5e0"},{url:"/_next/static/chunks/3756-33dab1829b54dc4b.js",revision:"33dab1829b54dc4b"},{url:"/_next/static/chunks/4072747d-83cc5c392b8c4a52.js",revision:"83cc5c392b8c4a52"},{url:"/_next/static/chunks/4246-ddd626d02f9efa6d.js",revision:"ddd626d02f9efa6d"},{url:"/_next/static/chunks/5761-6e5f84144125ddbe.js",revision:"6e5f84144125ddbe"},{url:"/_next/static/chunks/6145-44216c74a1c38a97.js",revision:"44216c74a1c38a97"},{url:"/_next/static/chunks/6211-c44f6bcaa2af9917.js",revision:"c44f6bcaa2af9917"},{url:"/_next/static/chunks/6254-70bb964e575d7fc6.js",revision:"70bb964e575d7fc6"},{url:"/_next/static/chunks/6370-0ba538e3020a78ea.js",revision:"0ba538e3020a78ea"},{url:"/_next/static/chunks/6886-e0263cd627824e51.js",revision:"e0263cd627824e51"},{url:"/_next/static/chunks/70cfe1b1.49b4b489c5176512.js",revision:"49b4b489c5176512"},{url:"/_next/static/chunks/7229.61acbf8ec170ae16.js",revision:"61acbf8ec170ae16"},{url:"/_next/static/chunks/8094.2dd2f34da147ad18.js",revision:"2dd2f34da147ad18"},{url:"/_next/static/chunks/8344-3179190fd6e55c0d.js",revision:"3179190fd6e55c0d"},{url:"/_next/static/chunks/8441-292835109cf6c898.js",revision:"292835109cf6c898"},{url:"/_next/static/chunks/8447-59b85596b1678ac1.js",revision:"59b85596b1678ac1"},{url:"/_next/static/chunks/9364-1c9566e1a02deda9.js",revision:"1c9566e1a02deda9"},{url:"/_next/static/chunks/9512-3780d8721ea13a17.js",revision:"3780d8721ea13a17"},{url:"/_next/static/chunks/9781-16d07b333de6e41b.js",revision:"16d07b333de6e41b"},{url:"/_next/static/chunks/framework-ce84985cd166733a.js",revision:"ce84985cd166733a"},{url:"/_next/static/chunks/main-d49091192c1d3a83.js",revision:"d49091192c1d3a83"},{url:"/_next/static/chunks/pages/401-40c5c752e5b4e3af.js",revision:"40c5c752e5b4e3af"},{url:"/_next/static/chunks/pages/404-900c9c9a1504e041.js",revision:"900c9c9a1504e041"},{url:"/_next/static/chunks/pages/500-6de396f587200b5c.js",revision:"6de396f587200b5c"},{url:"/_next/static/chunks/pages/_error-82b79221b9ed784b.js",revision:"82b79221b9ed784b"},{url:"/_next/static/chunks/pages/acl-d1f3ab4f22c40666.js",revision:"d1f3ab4f22c40666"},{url:"/_next/static/chunks/pages/category-086480aa52dcb7c7.js",revision:"086480aa52dcb7c7"},{url:"/_next/static/chunks/pages/category/tableCategory-93a6c5e9a4374b58.js",revision:"93a6c5e9a4374b58"},{url:"/_next/static/chunks/pages/client-report-ae5d21bb5ce06a71.js",revision:"ae5d21bb5ce06a71"},{url:"/_next/static/chunks/pages/client-report/TableClientReport-33831a7237e11e9c.js",revision:"33831a7237e11e9c"},{url:"/_next/static/chunks/pages/coupon-9e5359c3f60ae933.js",revision:"9e5359c3f60ae933"},{url:"/_next/static/chunks/pages/coupon/TableCoupon-f9c90b61366cf775.js",revision:"f9c90b61366cf775"},{url:"/_next/static/chunks/pages/course-021475eda004ad21.js",revision:"021475eda004ad21"},{url:"/_next/static/chunks/pages/course/TableCourse-bc19c71e54b9e33d.js",revision:"bc19c71e54b9e33d"},{url:"/_next/static/chunks/pages/dashboard-e33118646460ac6d.js",revision:"e33118646460ac6d"},{url:"/_next/static/chunks/pages/dashboard/city-2d3bc0343a04be48.js",revision:"2d3bc0343a04be48"},{url:"/_next/static/chunks/pages/dashboard/clients-97f2d1b506753532.js",revision:"97f2d1b506753532"},{url:"/_next/static/chunks/pages/dashboard/visits-cea184eac6db5306.js",revision:"cea184eac6db5306"},{url:"/_next/static/chunks/pages/embassie-8ab1864e8c18b00c.js",revision:"8ab1864e8c18b00c"},{url:"/_next/static/chunks/pages/embassie/TableEmbassie-5444215e132087f0.js",revision:"5444215e132087f0"},{url:"/_next/static/chunks/pages/events-491f52374b57e08c.js",revision:"491f52374b57e08c"},{url:"/_next/static/chunks/pages/events/TableEvents-2d907b2534bc5103.js",revision:"2d907b2534bc5103"},{url:"/_next/static/chunks/pages/forgot-password-3991b1018823a24b.js",revision:"3991b1018823a24b"},{url:"/_next/static/chunks/pages/home-9dbd5ed7869b3914.js",revision:"9dbd5ed7869b3914"},{url:"/_next/static/chunks/pages/index-ea166f1ae8fb8cb1.js",revision:"ea166f1ae8fb8cb1"},{url:"/_next/static/chunks/pages/login-750642a06537e0ec.js",revision:"750642a06537e0ec"},{url:"/_next/static/chunks/pages/mentoring-009d1d09584a8706.js",revision:"009d1d09584a8706"},{url:"/_next/static/chunks/pages/mentoring/TableMentoring-3535bce4da70f90d.js",revision:"3535bce4da70f90d"},{url:"/_next/static/chunks/pages/register-ea4bb96524f3180b.js",revision:"ea4bb96524f3180b"},{url:"/_next/static/chunks/pages/second-page-022fe91ff82be19d.js",revision:"022fe91ff82be19d"},{url:"/_next/static/chunks/pages/social-actions-2de51161b6dac5bf.js",revision:"2de51161b6dac5bf"},{url:"/_next/static/chunks/pages/social-actions/TableSocialActions-dc78d210265a92bb.js",revision:"dc78d210265a92bb"},{url:"/_next/static/chunks/pages/viewAcount-21d87cc8e8f4d176.js",revision:"21d87cc8e8f4d176"},{url:"/_next/static/chunks/pages/viewCoupon-546c8f837a4a27fc.js",revision:"546c8f837a4a27fc"},{url:"/_next/static/chunks/pages/viewCourse-3efc3e7a1acc3033.js",revision:"3efc3e7a1acc3033"},{url:"/_next/static/chunks/pages/viewCourse/modal-865cb02a90df1fb7.js",revision:"865cb02a90df1fb7"},{url:"/_next/static/chunks/pages/viewEmbassie-f9c1f99160a27676.js",revision:"f9c1f99160a27676"},{url:"/_next/static/chunks/pages/viewEvent-ffa529d41ccfe6f0.js",revision:"ffa529d41ccfe6f0"},{url:"/_next/static/chunks/pages/viewMentoring-45b682b5d1efa7f6.js",revision:"45b682b5d1efa7f6"},{url:"/_next/static/chunks/pages/viewSocialAction-8c05cae00a5cdcbf.js",revision:"8c05cae00a5cdcbf"},{url:"/_next/static/chunks/pages/viewSupport-cc57caf3f2b43323.js",revision:"cc57caf3f2b43323"},{url:"/_next/static/chunks/pages/viewSupport/FaqFooter-024cd3d0801715e1.js",revision:"024cd3d0801715e1"},{url:"/_next/static/chunks/pages/viewSupport/FaqHeader-11b6a224928db082.js",revision:"11b6a224928db082"},{url:"/_next/static/chunks/pages/viewSupport/Faqs-b8f179bde60c841e.js",revision:"b8f179bde60c841e"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-228279c227692ea5.js",revision:"228279c227692ea5"},{url:"/_next/static/css/375a85a193efa97a.css",revision:"375a85a193efa97a"},{url:"/_next/static/css/d65d11ed167ed478.css",revision:"d65d11ed167ed478"},{url:"/_next/static/css/f8f9a93d01245417.css",revision:"f8f9a93d01245417"},{url:"/cards/3d-illustration.png",revision:"ce8d2b0048c8b28f462fdb13964f7d10"},{url:"/cards/4-square.png",revision:"e2ed685959c0a0b370730eac1807eaa9"},{url:"/cards/accounting-logo.png",revision:"22eb54a48be7b9836406a739171df054"},{url:"/cards/activity-timeline.png",revision:"c6f7d715e08bd9befd66b139578e0e84"},{url:"/cards/amazon-echo-dot.png",revision:"57be15714d0a30df6659bd412aee6eae"},{url:"/cards/analog-clock.jpg",revision:"ca2aafe5ff9c057b27ffa0ad476d8632"},{url:"/cards/apple-iMac-4k.png",revision:"61a9688c95c0ed2183a796f575de3f94"},{url:"/cards/apple-iPhone-13-pro.png",revision:"61311c726352ccefe86eb984d0a0c5eb"},{url:"/cards/apple-iphone-x-lg.png",revision:"650501c719dd22813cb583f56a9ecd80"},{url:"/cards/apple-iphone-x.png",revision:"6243d29e514765118fb38a799841287f"},{url:"/cards/apple-mac-mini.png",revision:"8d64a60b5d34258237ce7b57403d36ec"},{url:"/cards/apple-watch-7.png",revision:"9d151b8ac60dd96b752a84b3918228fe"},{url:"/cards/apple-watch-green-lg.png",revision:"8387dd1b491dcc0fbffe6a12948f1c63"},{url:"/cards/apple-watch-green.png",revision:"4c4100f0a951e77ffd77526268907346"},{url:"/cards/apple-watch.png",revision:"0650ad76345aa6669431382772b3e022"},{url:"/cards/background-user.png",revision:"24b7f55941e9cece0d52f8845476bb32"},{url:"/cards/card-stats-img-1.png",revision:"76a63b2236bf312bc357aa3e109fa605"},{url:"/cards/card-stats-img-2.png",revision:"662acdd36c6115c35a189201631a4a49"},{url:"/cards/card-stats-img-3.png",revision:"e2061a422ba00e29317783b62ec47b36"},{url:"/cards/card-stats-img-4.png",revision:"33c83f65310422932d138db9b57ff9fd"},{url:"/cards/cherry.png",revision:"d5c72afd12c393e6f9208c88679eb6c3"},{url:"/cards/credit-card.png",revision:"fc33eef88017639690d82ecfe423e843"},{url:"/cards/dell-inspiron-3000.png",revision:"ea7dd5750f4bd546bc8da61cca3edc53"},{url:"/cards/delta-web-app.png",revision:"5fcd5c3e19bfffc1236fd62841e81edf"},{url:"/cards/ecommerce-website.png",revision:"05c3744784e37c8029e291920a14e187"},{url:"/cards/finance-app-design.png",revision:"9a16e7cfbc31da8bb2a1549cc5d71ea7"},{url:"/cards/flag-australia.png",revision:"6023356b3ae5ccd089cb1059a9a78770"},{url:"/cards/flag-brazil.png",revision:"d7194d0a75c5b4a0460b1c09099f9900"},{url:"/cards/flag-china.png",revision:"c3999d88639e9fe4ab2a0994bd39be39"},{url:"/cards/flag-france.png",revision:"05d7f8ca698ba2c9181e58cc41f7ec65"},{url:"/cards/flag-india.png",revision:"3fed0d9517c3cd59ffcceb3912fb7229"},{url:"/cards/flag-usa.png",revision:"348340c2b54b2a47d6f97f84b8e437f8"},{url:"/cards/google-pixel-6.png",revision:"de374b8da545274eb8e9560527c40397"},{url:"/cards/gramin-verve.png",revision:"8af267850db744706cd2d7b09fba4873"},{url:"/cards/hp-envy-x360.png",revision:"cc633608ff86e2a6f1bf40042eff4c47"},{url:"/cards/iPhone-11-pro.png",revision:"eb837807cbc3be28741f9cb09d1a357f"},{url:"/cards/iPhone-bg.png",revision:"e89356b31f2459fb224346f04f4b4dcd"},{url:"/cards/illustration-daisy-dark.png",revision:"f8c187485c22905bf36222e09df73bc5"},{url:"/cards/illustration-daisy-light.png",revision:"564dad7f40a975761c678f2a2f48ee61"},{url:"/cards/illustration-john-dark.png",revision:"5808fc3a84c738e2e94b6b7be109bf7d"},{url:"/cards/illustration-john-light.png",revision:"f36d938e4351c0297c040424bfb38f83"},{url:"/cards/illustration-upgrade-account.png",revision:"a3aadb7a6137f9842554e3d8deaed8e4"},{url:"/cards/logo-american-express.png",revision:"31aa7b514a3b5ff235555086901e9c0c"},{url:"/cards/logo-credit-card-2.png",revision:"38e979dae7eb1633e4f6ca7d1b612d70"},{url:"/cards/logo-mastercard-2.png",revision:"680aad1ab96884a5d76a94f75ce8d728"},{url:"/cards/logo-mastercard.png",revision:"47030eadae62fcdcc1b5579275627924"},{url:"/cards/logo-visa.png",revision:"745704fde4e9bd55ea24f4623dd77b91"},{url:"/cards/marketing-expense-logo.png",revision:"51c0ce22b299698de4e32bf2d4694a14"},{url:"/cards/mastercard.png",revision:"6965b397ce7b6d8f5205709c642a4e29"},{url:"/cards/nintendo-switch.png",revision:"455ed8390d1f6f267e472e1eacf66f0d"},{url:"/cards/oneplus-9-pro.png",revision:"5a4185e7f9c37f58b4a018d428347807"},{url:"/cards/orange-candy.png",revision:"a4ce25742add869bffb03177d7a48f68"},{url:"/cards/paypal.png",revision:"b546e2260bd723adbb64f47339f03b77"},{url:"/cards/ps4-joystick-lg.png",revision:"270fa2e1e21b9a53021424771bc100b9"},{url:"/cards/ps4-joystick.png",revision:"9b220c53cc80bcd6c83800844052d55b"},{url:"/cards/sales-overview-logo.png",revision:"4bfbcb228032190f66e66009196adc41"},{url:"/cards/samsung-s22.png",revision:"df57e95d1c4dbb8cef33b708ff8ee938"},{url:"/cards/samsung-watch-4.png",revision:"74226c0d91dc39988ba7763716eeb244"},{url:"/cards/social-dribbble.png",revision:"8521fd5dc0f7e7ae2da77f6227dd7683"},{url:"/cards/social-facebook.png",revision:"9b03c58d084b7dad8c83ec93af14f556"},{url:"/cards/social-instagram.png",revision:"915dd37ee7dd2236a70ae18a2fcd57ab"},{url:"/cards/social-twitter.png",revision:"9a8c9b761427e9e015f866df6088e52a"},{url:"/cards/sony-play-station-5.png",revision:"fadb7324ee9940be4565211b79f8b171"},{url:"/cards/stripe.png",revision:"81d4c0b1ad31fe1348d91a254bfdfb22"},{url:"/cards/sup-game-box-400.png",revision:"39d983be8dfbf908ed52b72e7e9a1c9d"},{url:"/cards/tabs-console.png",revision:"ad134c702aa6377e1eec1f1d3cf3a02a"},{url:"/cards/tabs-desktop.png",revision:"55770823ca8526bbd1bdbf6ee947c468"},{url:"/cards/tabs-mobile.png",revision:"c33a5925be9383419a4b9716ecde5e76"},{url:"/cards/tabs-watch.png",revision:"2d228f392f9cfae008f876c0d2d16ac8"},{url:"/cards/trophy.png",revision:"81d78e3233040668fa0fc0f7bff0ed5c"},{url:"/cards/wallet.png",revision:"213f130b549d2a9a5cd75c068de41dc8"},{url:"/cards/xbox-series-x.png",revision:"88cec39910c15e79678b6baf1a9e9c96"},{url:"/images/AppImages/android/android-launchericon-144-144.png",revision:"293a1ea814a455cfbf8a177363995452"},{url:"/images/AppImages/android/android-launchericon-192-192.png",revision:"4d796c13d9746870c0b36a31445322ec"},{url:"/images/AppImages/android/android-launchericon-48-48.png",revision:"f02c9d7213296a6d9a409d0d6d03ce02"},{url:"/images/AppImages/android/android-launchericon-512-512.png",revision:"38a41d78317fe6e49c51a10c7e28f5d4"},{url:"/images/AppImages/android/android-launchericon-72-72.png",revision:"dc9f435b3b9f7fa71c6d7e9ab59157d8"},{url:"/images/AppImages/android/android-launchericon-96-96.png",revision:"e7412b63e50049833068ead728fc8974"},{url:"/images/AppImages/icons.json",revision:"5dbbc3fe59816e65ba28e355a58ea45c"},{url:"/images/AppImages/ios/100.png",revision:"cae88415c500eebd8f71f82bc191febf"},{url:"/images/AppImages/ios/1024.png",revision:"754a720bf606ca97088709009bb61077"},{url:"/images/AppImages/ios/114.png",revision:"a5813fa56fa021075ae80dd5c03ca6c6"},{url:"/images/AppImages/ios/120.png",revision:"420a93fe49e050ad9a9a0b1d61f85635"},{url:"/images/AppImages/ios/128.png",revision:"afd2b4bd4079cdab6fef2ce835fec0b8"},{url:"/images/AppImages/ios/144.png",revision:"293a1ea814a455cfbf8a177363995452"},{url:"/images/AppImages/ios/152.png",revision:"2802371302c9fe1b7c3697edb7732285"},{url:"/images/AppImages/ios/16.png",revision:"5e1943d24dd7d5d16c276a902b58f86d"},{url:"/images/AppImages/ios/167.png",revision:"bb8744ee46650e6970c4cc36d2f68446"},{url:"/images/AppImages/ios/180.png",revision:"6af150568e9e5d986d4af9310112e2db"},{url:"/images/AppImages/ios/192.png",revision:"4d796c13d9746870c0b36a31445322ec"},{url:"/images/AppImages/ios/20.png",revision:"bed435e0629cdace67c61c3ba9f8e0db"},{url:"/images/AppImages/ios/256.png",revision:"e607cd66445650248cc98d158f29482c"},{url:"/images/AppImages/ios/29.png",revision:"e3a0ad27e5458980952b561c18e701fb"},{url:"/images/AppImages/ios/32.png",revision:"44b11a7a53d4e44d44ead6df2e446ea7"},{url:"/images/AppImages/ios/40.png",revision:"1552408a1f49fd721e52f72d88cb53c0"},{url:"/images/AppImages/ios/50.png",revision:"83d28ba437708228c84359cb2b4a626a"},{url:"/images/AppImages/ios/512.png",revision:"38a41d78317fe6e49c51a10c7e28f5d4"},{url:"/images/AppImages/ios/57.png",revision:"f1fd6bacbd173bea72e36360cb070a8a"},{url:"/images/AppImages/ios/58.png",revision:"cf770caa691c06207bca457d66092def"},{url:"/images/AppImages/ios/60.png",revision:"b31ff495696650f6b4ec4b9ce10b3e15"},{url:"/images/AppImages/ios/64.png",revision:"843659fe15202d4b85c3ef82ea545551"},{url:"/images/AppImages/ios/72.png",revision:"dc9f435b3b9f7fa71c6d7e9ab59157d8"},{url:"/images/AppImages/ios/76.png",revision:"f8fe71da24bfe23ac1c212e24b0a4787"},{url:"/images/AppImages/ios/80.png",revision:"2e49504f8cdc007931291442b5cc5c1e"},{url:"/images/AppImages/ios/87.png",revision:"c4916c7d1ac570a044b80ba304cc9042"},{url:"/images/AppImages/windows11/LargeTile.scale-100.png",revision:"eed7dc123a08f52c52d1c06cced18225"},{url:"/images/AppImages/windows11/LargeTile.scale-125.png",revision:"8e63061fff1f05db02ed3300e3e61917"},{url:"/images/AppImages/windows11/LargeTile.scale-150.png",revision:"779a7c2660cdc6362b66f2fcb7c084c5"},{url:"/images/AppImages/windows11/LargeTile.scale-200.png",revision:"b89aaf9362dca6744e644aaf36927a0d"},{url:"/images/AppImages/windows11/LargeTile.scale-400.png",revision:"77944a931c1f1937b9a2f16c98d11043"},{url:"/images/AppImages/windows11/SmallTile.scale-100.png",revision:"980e5a8da0c551d7b9b20cbca5bafd93"},{url:"/images/AppImages/windows11/SmallTile.scale-125.png",revision:"c940080f8c259050b75a433cdff52803"},{url:"/images/AppImages/windows11/SmallTile.scale-150.png",revision:"bb3b462a1a7d3a1bb2dbb6d56e620cb1"},{url:"/images/AppImages/windows11/SmallTile.scale-200.png",revision:"624084a2892f538d645aa352e6a5037a"},{url:"/images/AppImages/windows11/SmallTile.scale-400.png",revision:"1025b227acda31bacdafe22371c557fb"},{url:"/images/AppImages/windows11/SplashScreen.scale-100.png",revision:"e743eeb1fcdac5c349e5b80b23694fc1"},{url:"/images/AppImages/windows11/SplashScreen.scale-125.png",revision:"2ef7da14fbeab8b72b7782a9c289366a"},{url:"/images/AppImages/windows11/SplashScreen.scale-150.png",revision:"fdd7d5a5333323fd476a2623fd66b0a0"},{url:"/images/AppImages/windows11/SplashScreen.scale-200.png",revision:"44b83fdc66925d7b9ebdce5d0baf98b7"},{url:"/images/AppImages/windows11/SplashScreen.scale-400.png",revision:"952563dd8489a72d8c4c56e544d985f1"},{url:"/images/AppImages/windows11/Square150x150Logo.scale-100.png",revision:"d67722fa877adc68bb67a28454917a5e"},{url:"/images/AppImages/windows11/Square150x150Logo.scale-125.png",revision:"b3ab8c7f5bc0a3be46652ae834049e21"},{url:"/images/AppImages/windows11/Square150x150Logo.scale-150.png",revision:"2d9943768cb4bfa898aca17159630e4b"},{url:"/images/AppImages/windows11/Square150x150Logo.scale-200.png",revision:"d7ad55aab699f797de261fcf21fe4fd1"},{url:"/images/AppImages/windows11/Square150x150Logo.scale-400.png",revision:"7b13a5dda4943d09abb80404aad23f2b"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"30f5981ccf591fb3b27a6b8800e92a1d"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"b8ea3a3c5d05178bce36fdabec143c96"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"2a17a84c958bc50b31e3d73614e1861d"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"2c0903145e20aafc7fa51099a2bad320"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"a14a59beeb7a3914036a1d65bb601055"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"f868cd00e9b69321bba4618744a31ff6"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"cbb83ab9a5c298901a6060005cdd4d2f"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"3f52af36afb9813c5ca31195443678c5"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"43ba304183d1d2c1dcbdb3b0aabe420d"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"483655d192fe60dbf342c1a7fb171981"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"6b86c2ba04441eaf746baf045b8c3b9e"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"be65579c7ebd534b8c4e9e1f95a541e5"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"819f1ff2dcd6e9fe3881e30e210c667f"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"b757815162560770eb6e24660ebb18cc"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"b7b7c626897591d06f891187cd7f4cd4"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"30f5981ccf591fb3b27a6b8800e92a1d"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"b8ea3a3c5d05178bce36fdabec143c96"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"2a17a84c958bc50b31e3d73614e1861d"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"2c0903145e20aafc7fa51099a2bad320"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"a14a59beeb7a3914036a1d65bb601055"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"f868cd00e9b69321bba4618744a31ff6"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"cbb83ab9a5c298901a6060005cdd4d2f"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"3f52af36afb9813c5ca31195443678c5"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"43ba304183d1d2c1dcbdb3b0aabe420d"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"483655d192fe60dbf342c1a7fb171981"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"6b86c2ba04441eaf746baf045b8c3b9e"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"be65579c7ebd534b8c4e9e1f95a541e5"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"819f1ff2dcd6e9fe3881e30e210c667f"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"b757815162560770eb6e24660ebb18cc"},{url:"/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"b7b7c626897591d06f891187cd7f4cd4"},{url:"/images/AppImages/windows11/Square44x44Logo.scale-100.png",revision:"43ba304183d1d2c1dcbdb3b0aabe420d"},{url:"/images/AppImages/windows11/Square44x44Logo.scale-125.png",revision:"fb64845cdbd61f5be488838290d7e2a7"},{url:"/images/AppImages/windows11/Square44x44Logo.scale-150.png",revision:"df6e08f2ab8cd10728e48ebe3dbd2f8e"},{url:"/images/AppImages/windows11/Square44x44Logo.scale-200.png",revision:"f2455ab9b51d2aacc0fef74eb2c720f0"},{url:"/images/AppImages/windows11/Square44x44Logo.scale-400.png",revision:"6a0b65304f3d29cbea11ee24b2cd8ac7"},{url:"/images/AppImages/windows11/Square44x44Logo.targetsize-16.png",revision:"30f5981ccf591fb3b27a6b8800e92a1d"},{url:"/images/AppImages/windows11/Square44x44Logo.targetsize-20.png",revision:"b8ea3a3c5d05178bce36fdabec143c96"},{url:"/images/AppImages/windows11/Square44x44Logo.targetsize-24.png",revision:"2a17a84c958bc50b31e3d73614e1861d"},{url:"/images/AppImages/windows11/Square44x44Logo.targetsize-256.png",revision:"2c0903145e20aafc7fa51099a2bad320"},{url:"/images/AppImages/windows11/Square44x44Logo.targetsize-30.png",revision:"a14a59beeb7a3914036a1d65bb601055"},{url:"/images/AppImages/windows11/Square44x44Logo.targetsize-32.png",revision:"f868cd00e9b69321bba4618744a31ff6"},{url:"/images/AppImages/windows11/Square44x44Logo.targetsize-36.png",revision:"cbb83ab9a5c298901a6060005cdd4d2f"},{url:"/images/AppImages/windows11/Square44x44Logo.targetsize-40.png",revision:"3f52af36afb9813c5ca31195443678c5"},{url:"/images/AppImages/windows11/Square44x44Logo.targetsize-44.png",revision:"43ba304183d1d2c1dcbdb3b0aabe420d"},{url:"/images/AppImages/windows11/Square44x44Logo.targetsize-48.png",revision:"483655d192fe60dbf342c1a7fb171981"},{url:"/images/AppImages/windows11/Square44x44Logo.targetsize-60.png",revision:"6b86c2ba04441eaf746baf045b8c3b9e"},{url:"/images/AppImages/windows11/Square44x44Logo.targetsize-64.png",revision:"be65579c7ebd534b8c4e9e1f95a541e5"},{url:"/images/AppImages/windows11/Square44x44Logo.targetsize-72.png",revision:"819f1ff2dcd6e9fe3881e30e210c667f"},{url:"/images/AppImages/windows11/Square44x44Logo.targetsize-80.png",revision:"b757815162560770eb6e24660ebb18cc"},{url:"/images/AppImages/windows11/Square44x44Logo.targetsize-96.png",revision:"b7b7c626897591d06f891187cd7f4cd4"},{url:"/images/AppImages/windows11/StoreLogo.scale-100.png",revision:"83d28ba437708228c84359cb2b4a626a"},{url:"/images/AppImages/windows11/StoreLogo.scale-125.png",revision:"0db18adec598865569b32f2455d6b6a6"},{url:"/images/AppImages/windows11/StoreLogo.scale-150.png",revision:"cf397e7c4e90cc139f7f034d7523dc29"},{url:"/images/AppImages/windows11/StoreLogo.scale-200.png",revision:"cae88415c500eebd8f71f82bc191febf"},{url:"/images/AppImages/windows11/StoreLogo.scale-400.png",revision:"21cf4a2e68da02bdf845f0f2122e00da"},{url:"/images/AppImages/windows11/Wide310x150Logo.scale-100.png",revision:"e486b4d57455176fbf96b56d8c36676c"},{url:"/images/AppImages/windows11/Wide310x150Logo.scale-125.png",revision:"1c148bf75aed38394f672491f8e995f3"},{url:"/images/AppImages/windows11/Wide310x150Logo.scale-150.png",revision:"40a2cb39432cd8146bdd281a18221e1c"},{url:"/images/AppImages/windows11/Wide310x150Logo.scale-200.png",revision:"e743eeb1fcdac5c349e5b80b23694fc1"},{url:"/images/AppImages/windows11/Wide310x150Logo.scale-400.png",revision:"44b83fdc66925d7b9ebdce5d0baf98b7"},{url:"/images/apple-touch-icon.png",revision:"fc343040f2132ca273477fbea0a59189"},{url:"/images/avatars/1.png",revision:"defcf57fdce3b0b8d415b4f5dbc3102b"},{url:"/images/disponivel-google-play-badge.png",revision:"c59325400914d43829ef7706e3879c7c"},{url:"/images/favicon.ico",revision:"3d51c796475ea39158d2e5f6fd51b5a5"},{url:"/images/logo-correios.png",revision:"e6d48f52913f13cf44707fd62c3982b5"},{url:"/images/logo-ecommerce.png",revision:"ad11b0464558d0487a34fccd41efed33"},{url:"/images/logo.png",revision:"d42de1313aa256e513794c3582bf3bd7"},{url:"/images/logo2.png",revision:"7c4dae1c158466e95b79671038147922"},{url:"/images/pages/401.png",revision:"c9c65a024ce6adcdc2fb9290ab986330"},{url:"/images/pages/404.png",revision:"c3e24f4f157e0d0e40d0e7b51d353d89"},{url:"/images/pages/500.png",revision:"b19ba7b4baba6c008229c2f7295bd84d"},{url:"/images/pages/auth-v2-forgot-password-illustration-bordered-dark.png",revision:"2173a1d6c7731cc04d811d6486bc30e7"},{url:"/images/pages/auth-v2-forgot-password-illustration-bordered-light.png",revision:"4b33cb7ce5a775a16183cdced8f97129"},{url:"/images/pages/auth-v2-forgot-password-illustration-dark.png",revision:"70a37e5e8bc8ac7e2452aa97340e95a1"},{url:"/images/pages/auth-v2-forgot-password-illustration-light.png",revision:"98f517cb7f7653ec3c488b0780149fe2"},{url:"/images/pages/auth-v2-forgot-password-mask-dark.png",revision:"933b6f05687e799a28629fc7653ce310"},{url:"/images/pages/auth-v2-forgot-password-mask-light.png",revision:"a1846854e12b1e075f4eab4aa7941eb7"},{url:"/images/pages/auth-v2-login-illustration-bordered-dark.png",revision:"142a0046aa243174104102847333c357"},{url:"/images/pages/auth-v2-login-illustration-bordered-light.png",revision:"5a453805d0d394f6e6b19479383e2123"},{url:"/images/pages/auth-v2-login-illustration-dark.png",revision:"df3b8b75b2d1bb4d14fb5a0ff9e7712d"},{url:"/images/pages/auth-v2-login-illustration-light.png",revision:"9032fbf43ba92b50cc57142c7de05c09"},{url:"/images/pages/auth-v2-login-mask-dark.png",revision:"ea09bbdc72c2d942a46133bb85b2efdf"},{url:"/images/pages/auth-v2-login-mask-light.png",revision:"081504295840908115f879612f9d7d19"},{url:"/images/pages/auth-v2-register-illustration-bordered-dark.png",revision:"ae3ec89314a122f8c29dc5c4f9d8e3db"},{url:"/images/pages/auth-v2-register-illustration-bordered-light.png",revision:"9fbd04df37b6d4be126ffb10e86e4890"},{url:"/images/pages/auth-v2-register-illustration-dark.png",revision:"86c05fae7d5402e30b133eef52d7976c"},{url:"/images/pages/auth-v2-register-illustration-light.png",revision:"30033d9edd480569390113a84390d6de"},{url:"/images/pages/auth-v2-register-mask-dark.png",revision:"1857749869d3c788b5ec7550bf11f0ee"},{url:"/images/pages/auth-v2-register-mask-light.png",revision:"9148a4d69943174942adc668783de7b4"},{url:"/images/pages/auth-v2-register-multi-steps-illustration.png",revision:"14dc634c9fb15ffb778776b681bfde29"},{url:"/images/pages/misc-401-object.png",revision:"5ec475be18d66463bda09991fbaba631"},{url:"/images/pages/misc-404-object.png",revision:"2b91d6057b8edd30a8ae3a2a25fdacec"},{url:"/images/pages/misc-500-object.png",revision:"2b91d6057b8edd30a8ae3a2a25fdacec"},{url:"/images/pages/misc-coming-soon-object.png",revision:"f513dc3bf1baa456f69266c3ee31fda2"},{url:"/images/pages/misc-mask-dark.png",revision:"61c6e9767bd80670485cfe9f68da7d35"},{url:"/images/pages/misc-mask-light.png",revision:"23e83360ed3633244b73bab758e593ab"},{url:"/manifest.json",revision:"32ed0debf950121080b39b6aa0c353e5"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
