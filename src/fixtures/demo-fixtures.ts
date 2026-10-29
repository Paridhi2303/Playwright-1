import{test as base,Page} from "@playwright/test"
type myfixture={
   newPage:Page,
}

export const test =base.extend<myfixture>({ // expoting the created fixture
newPage:async({page},use)=>{
    await page.goto("https://practice.rcvacademy.com/multiple-windows")
    const [newpage]=await Promise.all([
        page.waitForEvent("popup"),
        page.getByTestId('open-new-window-btn').click()
      ]);
      newpage.waitForLoadState()
      await use(newpage)
      if(!newpage.isClosed()){
        await newpage.close()
      }
}
})
export {expect} from '@playwright/test'