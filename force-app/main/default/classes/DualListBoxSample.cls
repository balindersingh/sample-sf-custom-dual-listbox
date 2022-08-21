public class DualListBoxSample {

    @AuraEnabled(cacheable=true)
    public static List<MemberOptions> getRootItems() {
        List<MemberOptions> options = new List<MemberOptions>();
        options.add(new MemberOptions('US','US'));
        options.add(new MemberOptions('CANADA','Canada'));
        return options;
    }

    @AuraEnabled(cacheable=true)
    public static Map<string,List<MemberOptions>> getDetailItemsByRootItemValue(string rootItemValue) {
        Map<string,List<MemberOptions>> mapOfAllAndSelectedMemberOptions = new Map<string,List<MemberOptions>>();
    List<MemberOptions> options = new List<MemberOptions>();
        if(rootItemValue == 'CANADA'){
        options.add(new MemberOptions('CanadaItem1','Canada item 1'));
        options.add(new MemberOptions('CanadaItem2','Canada item 2'));
        options.add(new MemberOptions('CanadaItem3','Canada item 3'));
        } else if(rootItemValue == 'US'){
        options.add(new MemberOptions('USItem1','US item 1'));
        options.add(new MemberOptions('USItem2','US item 2'));
        options.add(new MemberOptions('USItem3','US item 3'));
        }
        mapOfAllAndSelectedMemberOptions.put('selected',new List<MemberOptions>());
        mapOfAllAndSelectedMemberOptions.put('all',options);
        return mapOfAllAndSelectedMemberOptions;
    }

    @AuraEnabled(cacheable = false)
    public static Map<String,String> addRemoveMemberFromGroup(List<string> listOfMembersToAdd,List<string> listOfMembersToRemove, string currentMemberDetailId) {
        Map<String,String> mapOfResponse = new Map<String,String>();
        try{
            if(currentMemberDetailId!=null && currentMemberDetailId!='' && (!listOfMembersToRemove.isEmpty() || !listOfMembersToAdd.isEmpty())){
                // ADD YOUR ADD?REMOVE DML LOGIC
                mapOfResponse.put('status','success');
                mapOfResponse.put('message','Successfuly assinged ('+listOfMembersToAdd.size()+') and unassigned ('+listOfMembersToRemove.size()+') members.');
            }
        }catch(Exception ex){
            mapOfResponse.put('status','error');
            mapOfResponse.put('message','Something went wrong. Please contact your system administrator.');
            mapOfResponse.put('error',''+ex.getMessage());
        }
        return mapOfResponse;
    }
    
    public class MemberOptions {
        @AuraEnabled
        public String label;
        @AuraEnabled
        public String value;
        public MemberOptions(String value, String label) {
            this.label = label;
            this.value = value;
        }
        public MemberOptions() {}
    }
}