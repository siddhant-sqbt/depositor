import FormCardHeading from "@/components/Common/FormCardHeading";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { partyTypeMapping, type PANFourthChar } from "@/lib/constants";
import type { DocumentFormValues } from "@/lib/types";
import { CircleUserRound } from "lucide-react";
import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";

const PartyRegistrationSection = ({ form }: { form: UseFormReturn<DocumentFormValues> }) => {
  const panNumber = form.watch("panNumber") || "";
  const fourthChar = panNumber.length >= 4 ? panNumber[3].toUpperCase() : "";

  const { partyType = [], subPartyType = [] } = useMemo(() => {
    form.setValue("partyType", "");
    form.setValue("subPartyType", "");
    if (fourthChar in partyTypeMapping) {
      return partyTypeMapping[fourthChar as PANFourthChar];
    }
    return { partyType: [], subPartyType: [], documents: [] };
  }, [fourthChar]);

  console.log("form", form.getValues());

  return (
    <Card>
      <FormCardHeading
        title={
          <>
            <CircleUserRound /> Basic Details
          </>
        }
      />{" "}
      <CardContent className="card-responsive-3">
        {/* Party Type */}
        <FormField
          control={form.control}
          name="partyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Party Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {partyType.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sub Party Type */}
        <FormField
          control={form.control}
          name="subPartyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub Party Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sub Party Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subPartyType.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pin Number */}
        <FormField
          control={form.control}
          name="pinNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pin No.</FormLabel>
              <FormControl>
                <Input placeholder="Enter Pin Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name 1 */}
        <FormField
          control={form.control}
          name="name1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name 1</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name 2 */}
        <FormField
          control={form.control}
          name="name2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name 2</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name 3 */}
        <FormField
          control={form.control}
          name="name3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name 3</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Line 1 */}
        <FormField
          control={form.control}
          name="address1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1 *</FormLabel>
              <FormControl>
                <Input placeholder="Enter Address Line 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Line 2 */}
        <FormField
          control={form.control}
          name="address2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2</FormLabel>
              <FormControl>
                <Input placeholder="Enter Address Line 2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Line 3 */}
        <FormField
          control={form.control}
          name="address3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 3</FormLabel>
              <FormControl>
                <Input placeholder="Enter Address Line 3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Enter City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* State */}
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* District */}
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Input placeholder="Enter District" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default PartyRegistrationSection;
