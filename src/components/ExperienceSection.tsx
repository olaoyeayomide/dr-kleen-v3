// import { Check } from "lucide-react";

// export function ExperienceSection() {
//   return (

import { Check } from "lucide-react";

export function ExperienceSection() {
  const commitments = [
    {
      title: "We are Committed",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod tempor incididunt ut labore.",
    },
    {
      title: "Trusted Professionals",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod tempor incididunt ut labore.",
    },
    {
      title: "Highly Rated Cleaning",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod tempor incididunt ut labore.",
    },
  ];

  return (
    <section
      id="about"
      className="
        relative isolate overflow-hidden
        bg-[#f5f9fd]
        scroll-mt-20
        py-12
        sm:py-16
        md:py-20
        lg:py-24
        xl:py-28
      "
    >
      {/* =========================================================
          DECORATIVE BACKGROUND CIRCLES
      ========================================================== */}

      <div
        className="
          pointer-events-none absolute
          right-[5%] top-[13%]
          h-3.5 w-3.5
          rounded-full
          border border-[#8dbcf0]
          sm:h-4 sm:w-4
          lg:h-5 lg:w-5
        "
      />

      <div
        className="
          pointer-events-none absolute
          right-[3.5%] top-[18%]
          h-5 w-5
          rounded-full
          border border-[#8dbcf0]
          sm:h-6 sm:w-6
          lg:h-7 lg:w-7
        "
      />

      <div
        className="
          pointer-events-none absolute
          bottom-[3%] left-[10%]
          h-3.5 w-3.5
          rounded-full
          border border-[#8dbcf0]
          sm:h-4 sm:w-4
          lg:h-5 lg:w-5
        "
      />

      <div
        className="
          pointer-events-none absolute
          bottom-[1%] left-[12%]
          h-5 w-5
          rounded-full
          border border-[#8dbcf0]
          sm:h-6 sm:w-6
          lg:h-7 lg:w-7
        "
      />

      {/* =========================================================
          MAIN CONTAINER
      ========================================================== */}

      <div
        className="
          mx-auto w-full
          max-w-[1420px]
          px-5
          sm:px-8
          md:px-10
          lg:px-12
          xl:px-16
          2xl:px-20
        "
      >
        <div
          className="
            grid
            items-center
            gap-14

            lg:grid-cols-[0.98fr_1fr]
            lg:gap-12

            xl:grid-cols-[1fr_1fr]
            xl:gap-16

            2xl:gap-20
          "
        >
          {/* =====================================================
              LEFT SIDE — IMAGE COLLAGE
          ====================================================== */}

          <div className="relative flex w-full justify-center lg:justify-start">
            <div
              className="
                relative
                h-[300px]
                w-full
                max-w-[430px]

                sm:h-[400px]
                sm:max-w-[520px]

                md:h-[500px]
                md:max-w-[600px]

                lg:h-[500px]
                lg:max-w-[600px]

                xl:h-[515px]
                xl:max-w-[620px]
              "
            >
              {/* =================================================
                  MAIN IMAGE

                  MOBILE:
                  This is the ONLY rectangular image shown.

                  TABLET/DESKTOP:
                  Becomes part of the complete collage.
              ================================================== */}

              <div
                className="
                  absolute
                  left-0
                  top-[30px]

                  h-[250px]
                  w-[82%]

                  overflow-hidden
                  rounded-[24px]

                  bg-[#e8f0f7]

                  shadow-[0_18px_45px_rgba(27,63,105,0.12)]

                  sm:left-[2%]
                  sm:top-[20px]
                  sm:h-[270px]
                  sm:w-[70%]
                  sm:rounded-[28px]

                  md:h-[285px]

                  lg:left-[2%]
                  lg:top-0
                  lg:h-[282px]
                  lg:w-[61%]
                  lg:rounded-[30px]
                "
              >
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85"
                  alt="Professional cleaner cleaning a surface"
                  className="
                    h-full
                    w-full
                    object-cover
                    object-center
                  "
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* =================================================
                  CIRCULAR IMAGE

                  MOBILE:
                  Overlays the TOP-RIGHT corner of the main image.

                  TABLET:
                  Moves toward the right side.

                  DESKTOP:
                  Returns to the original collage position.
              ================================================== */}

              <div
                className="
                  absolute
                  right-[0%]
                  top-0
                  z-20

                  h-[115px]
                  w-[115px]

                  overflow-hidden
                  rounded-full

                  border-[5px]
                  border-[#f5f9fd]

                  bg-[#e8f0f7]

                  shadow-[0_14px_35px_rgba(27,63,105,0.18)]

                  sm:right-[5%]
                  sm:top-[2%]
                  sm:h-[140px]
                  sm:w-[140px]

                  md:right-[4%]
                  md:h-[160px]
                  md:w-[160px]

                  lg:left-[65%]
                  lg:right-auto
                  lg:top-[3%]
                  lg:h-[180px]
                  lg:w-[180px]
                "
              >
                <img
                  src="https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=800&q=85"
                  alt="Cleaning professional wearing gloves"
                  className="
                    h-full
                    w-full
                    object-cover
                    object-center
                  "
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* =================================================
                  LOWER RIGHT IMAGE

                  HIDDEN ON MOBILE.

                  SHOWN FROM LG UPWARD.
              ================================================== */}

              <div
                className="
                  absolute
                  left-[43%]
                  top-[43%]

                  hidden

                  h-[230px]
                  w-[55%]

                  overflow-hidden
                  rounded-[25px]

                  border-[5px]
                  border-[#f5f9fd]

                  bg-[#e8f0f7]

                  shadow-[0_20px_45px_rgba(27,63,105,0.12)]

                  lg:block
                  lg:h-[288px]
                  lg:rounded-[30px]
                "
              >
                <img
                  src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=85"
                  alt="Professional cleaning technician"
                  className="
                    h-full
                    w-full
                    object-cover
                    object-center
                  "
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* =================================================
                  16+ YEARS CARD

                  HIDDEN ON MOBILE.

                  SHOWN FROM LG UPWARD.
              ================================================== */}

              <div
                className="
                  absolute
                  bottom-[4%]
                  left-[9%]
                  z-30

                  hidden

                  h-[125px]
                  w-[125px]

                  flex-col
                  items-center
                  justify-center

                  rounded-[24px]

                  bg-[#679fe4]

                  shadow-[0_20px_45px_rgba(76,133,210,0.30)]

                  lg:flex
                  lg:h-[153px]
                  lg:w-[153px]
                  lg:rounded-[27px]
                "
              >
                <div
                  className="
                    text-[46px]
                    font-extrabold
                    leading-none
                    tracking-[-0.05em]
                    text-white
                  "
                >
                  16+
                </div>

                <div
                  className="
                    mt-2
                    text-center
                    text-[13px]
                    font-medium
                    leading-[1.25]
                    text-white
                  "
                >
                  Successful
                  <br />
                  Years
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE — CONTENT
          ====================================================== */}

          <div
            className="
              relative
              mx-auto
              w-full
              max-w-[620px]
              lg:mx-0
            "
          >
            {/* ABOUT US */}

            <div
              className="
                mb-5
                inline-flex
                items-center
                rounded-[6px]
                border
                border-[#c7ddf7]
                bg-[#e5f1fd]
                px-5
                py-2
                text-[11px]
                font-bold
                uppercase
                tracking-[0.10em]
                text-[#6098d9]
                shadow-[0_5px_15px_rgba(88,145,210,0.08)]

                sm:mb-6
                sm:text-[12px]
              "
            >
              About Us
            </div>

            {/* Right Column: Content & 3 Commitment Items */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#031F5E] tracking-tight leading-[1.2]">
                  We Are Very Experienced <br />
                  In Cleaning Services
                </h2>
                <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  eiusmod tempor incididunt ut labore.
                </p>
              </div>

              {/* 3 Check items with circular checkmark badges */}
              <div className="space-y-6 pt-2">
                {commitments.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-100 border border-sky-300 flex items-center justify-center text-[#1d82a6] mt-0.5 group-hover:bg-[#1d82a6] group-hover:text-white transition-colors duration-200">
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#031F5E] group-hover:text-[#1d82a6] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
