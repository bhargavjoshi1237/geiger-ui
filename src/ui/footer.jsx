import Logo from "./logo.jsx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion.jsx";
import { GlassWordmark } from "./glass-wordmark.jsx";

// Suite footer, matching geiger-dash's. Plain anchors: the pages live at the domain root, outside each app's basePath.
const linkCls = "hover:text-foreground transition-colors text-muted-foreground text-sm";

const PRODUCTS = [
  ["Geiger Notes", "/notes"],
  ["Geiger Flow", "/flow"],
  ["Geiger Assets", "/assets"],
  ["Geiger Grey", "/grey"],
];

const MORE_PRODUCTS = [
  ["Geiger Forms", "/forms"],
  ["Geiger Events", "/events"],
  ["Geiger Content", "/content"],
  ["Geiger Campaign", "/campaign"],
  ["Geiger Pods", "/pods"],
  ["Geiger Comms", "/comms"],
  ["Geiger Docs", "/docs"],
  ["Geiger Property", "/property"],
];

const RESOURCES = [
  ["Why Geiger", "/why-geiger"],
  ["Ticket Fee Calculator", "/tools/ticket-fee-calculator"],
  ["Platform Comparisons", "/compare"],
  ["Form Templates", "/templates"],
  ["Help Center", "/help"],
  ["Contact Support", "/contact"],
];

const COMPANY = [
  ["About", "/about"],
  ["Blog", "/blog"],
  ["Change Log", "/changelog"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
];

function LinkList({ links }) {
  return (
    <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
      {links.map(([label, href]) => <li key={href}><a href={href} className="hover:text-foreground transition-colors">{label}</a></li>)}
    </ul>
  );
}

// The first four products, with the rest behind an "& N More" disclosure.
function FooterProducts() {
  return (
    <ul className="space-y-3">
      {PRODUCTS.map(([label, href]) => <li key={href}><a href={href} className={linkCls}>{label}</a></li>)}
      <li>
        <Accordion type="single" collapsible>
          <AccordionItem value="more" className="border-none">
            <AccordionTrigger className="py-0 text-sm font-normal text-muted-foreground hover:text-foreground hover:no-underline [&>svg]:size-3.5">
              & {MORE_PRODUCTS.length} More
            </AccordionTrigger>
            <AccordionContent className="pb-0 pt-3">
              <ul className="space-y-3">
                {MORE_PRODUCTS.map(([label, href]) => <li key={href}><a href={href} className={linkCls}>{label}</a></li>)}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </li>
    </ul>
  );
}

// Animated: the closing "GEIGER STUDIO" wordmark is cut out of a WebGL fluted-glass fill (see glass-wordmark.jsx).
export default function Footer() {
  return (
    <div className="bg-background">
      <footer className="w-full border-t border-border/50 bg-background pt-16 pb-8 relative z-30 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-4 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Logo size={20} className="text-foreground" />
                </div>
                <span className="text-lg font-bold tracking-tight text-foreground dark:bg-gradient-to-r dark:from-zinc-100 dark:to-zinc-400 dark:bg-clip-text dark:text-transparent">
                  Geiger Studios
                </span>
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Built to Manage. Designed to Create.
                <br /> Turn your ideas into something real with a single suite that combines solid management tools and easy-to-use creative features.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-foreground mb-4">Products</h2>
              <FooterProducts />
            </div>

            <div>
              <h2 className="font-bold text-foreground mb-4">Resources</h2>
              <LinkList links={RESOURCES} />
            </div>

            <div>
              <h2 className="font-bold text-foreground mb-4">Company</h2>
              <LinkList links={COMPANY} />
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 text-sm text-muted-foreground md:flex-row">
            <p>&copy; {new Date().getFullYear()} Geiger Studios. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      <div className="mt-10 flex justify-center bg-background py-[1.7vw] relative z-0"><GlassWordmark /></div>
    </div>
  );
}
