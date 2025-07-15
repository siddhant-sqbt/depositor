import FormCardHeading from "@/components/Common/FormCardHeading";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { defaultPartyTypeMapping, partyTypeMapping, STATE_PINCODE_OPTIONS, type PANFourthChar } from "@/lib/constants";
import { registerDepositorFormSchema } from "@/lib/schema";
import type { DocumentFormValues, IDistrict, IStateObject } from "@/lib/types";
import { getFieldRequiredStatus } from "@/lib/utils";
import { CircleUserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import api from "@/lib/apis/axiosInstance";

const BasicDetailsSection = ({ form }: { form: UseFormReturn<DocumentFormValues> }) => {
  const panNumber = form.watch("panNumber") || "";
  const selectedState = form.watch("state") || "";
  const gstNumber = form.watch("gstNumber") || "";
  // const stateCode = gstNumber?.length >= 2 ? Number(gstNumber?.substring(0, 2)) : "";

  const selectedPartyType = form.watch("partyType") || "";
  const fourthChar = panNumber.length >= 4 ? panNumber[3].toUpperCase() : "";

  const { partyType = [], subPartyType = [] } = useMemo(() => {
    if (fourthChar in partyTypeMapping) {
      return partyTypeMapping[fourthChar as PANFourthChar];
    }
    return defaultPartyTypeMapping;
  }, [fourthChar]);

  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [districtsLoading, setDistrictsLoading] = useState<boolean>(false);

  const handlePartyTypeChange = () => {
    console.log("Party Type onChange triggered");
    form.setValue("subPartyType", "");
  };

  const handleStateChange = () => {
    console.log("District onChange triggered");
    form.setValue("district", "");
  };

  useEffect(() => {
    if (!selectedState) {
      setDistricts([]);
      return;
    }

    const fetchDistricts = async () => {
      try {
        setDistrictsLoading(true);
        const response = await api.get(`/get-state-district?state=${selectedState}`);
        setDistricts(response?.data);
      } catch (error) {
        console.error("Error fetching districts:", error);
        setDistricts([]);
      } finally {
        setDistrictsLoading(false);
      }
    };

    fetchDistricts();
  }, [selectedState]);

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
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handlePartyTypeChange();
                }}
                value={field.value}
              >
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
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sub Party Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(selectedPartyType === "Individual" && fourthChar === "" ? ["Select", "Farmer", "Individual", "Proprietorship"] : subPartyType).map((type) => (
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
        {/* <FormField
          control={form.control}
          name="pinNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
                <Input placeholder="Enter Pincode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="pinNumber"
          render={({ field }) => {
            // const selectedStateObj = STATE_PINCODE_OPTIONS.find((s) => s.value === Number(selectedState));

            // const min = selectedStateObj?.minPincode ?? 0;
            // const max = selectedStateObj?.maxPincode ?? 999999;
            const min = 0;
            const max = 999999;

            return (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={`Enter Pincode`}
                    {...field}
                    min={min}
                    max={max}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {/* Name 1 */}
        <FormField
          control={form.control}
          name="name1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name 1 {getFieldRequiredStatus(registerDepositorFormSchema, "prefferedLocationDetails.warehouseState") && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
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
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleStateChange();
                }}
                value={field.value}
                disabled={gstNumber?.length >= 2}
              >
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {STATE_PINCODE_OPTIONS?.map((stateObj: IStateObject, index: number) => {
                    return (
                      <SelectItem value={`${stateObj?.value}`} key={index}>
                        {stateObj?.label}
                      </SelectItem>
                    );
                  })}
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
              <Select onValueChange={field.onChange} value={field.value} disabled={selectedState === ""}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder={districtsLoading ? "Loading Districts" : "Select District"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {districts &&
                    districts?.map((stateObj: IDistrict) => {
                      return <SelectItem value={`${stateObj?.id}`}>{stateObj?.long_desc}</SelectItem>;
                    })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default BasicDetailsSection;
